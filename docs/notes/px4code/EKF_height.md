---
title: EKF高度估计
createTime: 2024/09/06 23:36:40
permalink: /px4code/ti2v4oag/
---
# EKF悬停油门估计器

油门固件是一个典型的单变量EKF估计器，可以作为EKF的入门,如果还不了解EKF，可以查看[Kalman filter from the ground up](https://www.kalmanfilter.net/book.html)

::: info 信息
以Px4 v1.13.3为例，核心代码在 ==mc_hover_thrust_estimator==   ==zero_order_thrust_ekf== 中
:::

## 坐标设置
对于ned坐标系，z轴方向向下，为了抵抗重力。imu的加速度中会存在一个，沿z轴向上的加速度,在end坐标系下为(0,0,-CONST_G)。

```
CONST_G = 9.8
```


## EKF 观测模型

在ENU坐标系下imu z轴方向下的测量值 $a_z$ 为 

$$
a_z = a_z^{real} + g
$$

当 坐标系为 END，t的范围是$(-1,0)$时，令 hover_thrust =$h$ ，z轴方向的推力为$t_z$，则观测方程如下。


$$
a_z^{real} =\frac{t_z}{h}*g - g
$$

> 坐标系为 ENU 



```c++
/**
 * @file zero_order_thrust_ekf.hpp
 * @brief Implementation of a single-state hover thrust estimator
 * @author Mathieu Bresciani 	<brescianimathieu@gmail.com>

 */
```

**EKF 中涉及正态分布的变量**

1. process noises - covariance Qk 来自与实际器件
1. observation noises - covariance Rk 来自与实际器件
1. state estimate x^k - state covariance estimate Pk 
1. Innovation or measurement residual yk~- Innovation (or residual) covariance Sk




state: hover thrust (Th)


以油门估计为例。
垂直加速度作为一种测量值，而当前的推力（T[k]）被用在测量模型中，
状态方程 x 为油门估计（Thk） A=1

$$
x_{k+1} = A*x_k + v ,\text{with v}\sim  N(0, Q)
$$

测量方程 z为 z轴方向的加速度
$$
z_{k+1} = h(x_k) + w ,\text{with v}\sim  N(0, R)
$$

其中,测量模型
$$
h(x_k)=g\frac{T_k}{x_k}-g
$$


## Predict

$$
\begin{aligned}
\text{Predict}& \\
\hat{\boldsymbol{x}}_{k \mid k-1}&=f\left(\hat{\boldsymbol{x}}_{k-1 \mid k-1}, \boldsymbol{u}_{k-1}\right) \\
\boldsymbol{P}_{k \mid k-1}&=\boldsymbol{F}_{k} \boldsymbol{P}_{k-1 \mid k-1} \boldsymbol{F}_{k}^{T}+\boldsymbol{Q}_{k-1}
\end{aligned}
$$

由于A=1 因此预测部分仅需更新状态方差
```c++
_state_var += _process_var * dt * dt; // 量纲统一
```

直观理解是预测的 (t2像是统一量纲)


## Update
$$
\begin{aligned}
\text{Update |Fuse}& \\
\tilde{\boldsymbol{y}}_{k}&=\boldsymbol{z}_{k}-h\left(\hat{\boldsymbol{x}}_{k \mid k-1}\right) \\
\boldsymbol{S}_{k}&=\boldsymbol{H}_{k} \boldsymbol{P}_{k \mid k-1} \boldsymbol{H}_{k}^{T}+\boldsymbol{R}_{k} \\
\text{} \\
\boldsymbol{K}_{k}&=\boldsymbol{P}_{k \mid k-1} \boldsymbol{H}_{k}^{T} \boldsymbol{S}_{k}^{-1} \\
\text{}\\
\hat{\boldsymbol{x}}_{k \mid k}&=\hat{\boldsymbol{x}}_{k \mid k-1}+\boldsymbol{K}_{k} \tilde{\boldsymbol{y}}_{k} \\
\boldsymbol{P}_{k \mid k}&=\left(\boldsymbol{I}-\boldsymbol{K}_{k} \boldsymbol{H}_{k}\right) \boldsymbol{P}_{k \mid k-1}
\end{aligned}
$$
### H 计算
对h(xk)求偏导
$$
H(x_k)== -g \frac{T_k}{x_k^2}
$$
剩下的对照[Wiki中Discrete-time predict and update equations](https://en.wikipedia.org/wiki/Extended_Kalman_filter#Discrete-time%20predict%20and%20update%20equations)即可
```c++
//计算H 
H = -CONSTANTS_ONE_G * thrust / (_hover_thr * _hover_thr)
//Innovation or measurement residual
//"residual" 是指观测值与模型预测值之间的差异
const float predicted_acc_z = CONSTANTS_ONE_G * thrust / _hover_thr - CONSTANTS_ONE_G;
innov = acc_z- predicted_acc_z;

const float R = _acc_var * _acc_var_scale;
const float P = _state_var;
innovVar =  MyMath::max(H * P * H + R, R);

//computeKalmanGain
kalmanGain = _state_var * H / innov_var;
//updateState
_hover_thr = MyMath::constrain(_hover_thr + K * innov, _hover_thr_min, _hover_thr_max);
//updateStateCovariance
_state_var = MyMath::constrain((1.f - K * H) * _state_var, 1e-10f, 1.f);
```

这里需要整定的参数为
- 初始悬停油门估计
- 油门噪声
- 加速度噪声
- 系数| 速度快时增加加速度方差，以降低敏感度【可选】
## Gate
> 扒代码时默认关掉了，可以通过

在测量更新步骤中，检查了归一化创新平方（Normalized Innovation Squared，NIS），评估系统测量与模型之间的不匹配性，如果大于门限大小，则拒绝该测量。当连续拒绝太多测量时，会触发一种恢复逻辑，包括重置测量方差和增加状态方差(a state variance boost).

$$
\text{NIS}=(z−\hat{z})^TS^{-1}(z−\hat{z})
$$
**设定门限（Gate Threshold）**：选择适当的门限值。门限值通常基于卡方分布，与系统的置信水平和测量维度有关。参数中设置的gate是标准差，比较时变成方差
    
**检查 NIS 值是否超过门限**：将计算得到的 NIS 值与设定的门限进行比较。
- 如果 NIS 值小于门限，表示测量值在卡尔曼滤波的预测区域内，可以接受该测量并更新状态。
- 如果 NIS 值大于门限，表示测量值偏离预测，可能是由于模型不准确或者测量异常，可以选择拒绝该测量，不更新状态。

这里需要整定的参数为
- Gate
## 加速计噪声实时估计

测量噪声方差 R 是通过在每次测量更新后使用残差(residual)连续估计的，具体使用以下方程：
```
 alpha = _dt / (_noise_learning_time_constant + _dt);
 R = (1 - alpha) * R + alpha * (z^2 + P * H^2)
```
>Where z is the residual and alpha a forgetting factor between 0 and 1 (see S.Akhlaghi et al., Adaptive adjustment of noise covariance in Kalman filter for dynamic state estimation, 2017)

这里 z 是一个 "residual"，并减去了一个通过lpf估计的 bias.

没有要整定的参数 


## State 方差 放大

当NIS 值持续大于门限时临时放大State 方差，
```
_state_var += 1e3f * _process_var * _dt * _dt;
```
如何判定持续，使用了一个LPF







<!--  -->

