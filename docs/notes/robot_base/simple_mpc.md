---
title: 线性MPC(LMPC)
createTime: 2024/09/09 17:07:21
permalink: /0m313cht/
---

<!-- # 线性MPC(LMPC) -->

## 二次规划（Quadratic programming）问题[^kong_zhi_zhi_mei]

一个标准的二次规划问题的目标函数可以写成

$$
\min_{\mathbf{u}}{J}=\frac{1}{2}\mathbf{u}\mathbf{H}\mathbf{u} + \mathbf{f}^T\mathbf{u}
$$
其中
- $\mathbf{H}$ 是对称正定矩阵

::: tip
二次规划问题是一种特殊类型的最优化问题，当$Q$ 为正定或正半定矩阵时，目标函数是凸的，此时问题有唯一的全局最优解([全局最小值](./math_base.md#对于多元函数))。

二次型目标函数前面加 $\frac{1}{2}$ 主要是为了简化求导时的表达式，避免出现额外的系数，同时它也对问题的最优解没有实际影响。这种写法更多是数学推导和计算上的一种规范和习惯。
:::




## 最优控制问题[^kong_zhi_zhi_mei]

最优控制是指在一定的约束条件下，通过优化系统的控制输入，使得系统在特定性能指标上实现最优表现的一类控制方法。

一个最优控制问题包含以下几个方面

- 系统的数学模型(状态空间模型)
- 目标值(参考值)
- 性能指标(代价函数)
- 约束条件


## LQR VS MPC

|特性	|LQR	|MPC|
|-------|-------|----|
|适用系统|	线性系统	   | 线性与非线性系统|
|目标函数|	二次型、时间无穷|	二次型、有限预测时间|
|优化问题的求解方式	| **一次性求解**，通过黎卡提方程得到反馈矩阵后，不再进行优化 | 实时滚动优化，在每个时间步上重新求解优化问题|
|优化频率|	**一次性**（设计时求解一次，避让设定系统期望）	|每个时间步（实时求解，每次滚动窗口预测并优化）|
|计算复杂度| 低，控制过程中只需简单的矩阵乘法|	高，每个时间步需在线求解优化问题|
|约束处理| 无法直接处理，需要外部技术支持 |	显式处理状态和控制输入约束|

::: tip
MPC 与 LQR 的区别是增加了一个滚动优化控制（Receding Horizon Control）,滚动优化控制（Receding Horizon Control）是指从当前时刻到未来一时刻这一有限时间段内，根据当前状态以及对未来的预测
:::

## MPC 的优化问题

在实践中MPC多为数字控制，因此使用离散系统进行分析。以一个==跟踪问题==为例，对于一个离散线性时不变系统的状态空间方程（status space）为

$$
 x(k+1) = Ax(k)+Bu(k)
$$

定义其二次型代价函数为

<!-- $$
J = \int_{0}^{t_f} (E^TQE + u^TRu)dt
$$ -->

$$
\min_{u}{\mathbf{J}}= \sum_{i=0}^{N-1} \mathbf{x}_{k+i|k}^T\mathbf{Q}\mathbf{x}_{k+i|k} + \mathbf{u}_{k+i|k}^T\mathbf{R}\mathbf{u}_{k+i|k}
$$

::: tip
Q 与 R 是需要调节的，
:::

::: caution TODO
这里漏掉了对末端的约束，应该影响不大
:::

::: tip
对于不同的控制任务，写出的代价函数也不同
:::

### 将代价函数转换为2次型

::: tip
现有的二次规划求解软件已经非常成熟，因此在处理模型预测控制问题时，我们将重点放在如何将问题转换为标准的二次规划形式。
:::

mpc 接合当前状态和已有模型预测一段时间（predictive horizon）的控制结果，在实践中控制器一般是离散形式的，当预测步长为N时

将预测区间(predictive horizon)中所有的 x 写到一起

$$
\begin{equation}
\begin{aligned}
\mathbf{X}_k
& =
\begin{bmatrix}
x(k|k) \\
x(k+1|k) \\
... \\
x(k+N|k)
\end{bmatrix}
=
\begin{bmatrix}
x(k|k) \\
Ax(k|k)+Bu(k|k) \\
A^2x(k|k)+ABu(k|k) + Bu(k+1|k)\\
A^3x(k|k)+A^2Bu(k|k) + ABu(k+1|k) + Bu(k+2|k)\\
... \\
A^{N}x(k|k)+A^{N-2}Bu(k|k) A^{N-3}Bu(k|k)+ ... + Bu(k+N|k)
\end{bmatrix}
\\
& =
\begin{bmatrix}
I\\ A \\ A^2 \\ A^3 \\ ... \\ A^N
\end{bmatrix} x(k|k)
+
\begin{bmatrix}
0 \\
Bu(k|k) \\
ABu(k|k) + Bu(k+1|k)\\
A^2Bu(k|k) + ABu(k+1|k) + Bu(k+2|k)\\
... \\
A^{N-2}Bu(k|k) A^{N-3}Bu(k|k)+ ... + Bu(k+N|k)
\end{bmatrix}\\
&=
\begin{bmatrix}
I\\ A \\ A^2 \\ A^3 \\ ... \\ A^N
\end{bmatrix} x(k|k)
+
\begin{bmatrix}
0\\
B\\
AB & B \\
A^2B & AB & B\\
A^3B & A^2B & AB & B\\
\end{bmatrix}
\begin{bmatrix}
u(k|k) \\
u(k+1|k) \\
u(k+2|k) \\
u(k+3|k) \\
... \\
u(k+N|k) \\
\end{bmatrix}\\
& = Mx_k+CU_k
\end{aligned}
\end{equation}
$$
将控制区间(predictive horizon)中所有的 u 写到一起
$$
\mathbf{U}_k=
\begin{bmatrix} 
\mathbf{u}(k|k),\mathbf{u}(k+1|k),...,\mathbf{u}(k+N|k)
\end{bmatrix}^T
$$

对于代价函数，预测区间(prediction horizon) $N_p$和控制区间(control horizon)$N_c$，当 $N_p = N_c = N$时

$$
\begin{equation}
\begin{aligned}
\mathbf{J} &= \sum_{i=0}^{N-1} \mathbf{x}_{k+i|k}^T\mathbf{Q}\mathbf{x}_{k+i|k} + \mathbf{u}_{k+i|k}^T\mathbf{Q}\mathbf{u}_{k+i|k}  \\
&= 
\begin{bmatrix}
x(k|k) \\
x(k+1|k) \\
... \\
x(k+N|k)
\end{bmatrix}^T
\begin{bmatrix}
Q\\
0 & Q\\
0 & 0 & Q\\
0 & 0 & 0 & ...\\
0 & 0 & 0 & 0& Q\\
\end{bmatrix}
\begin{bmatrix}
x(k|k) \\
x(k+1|k) \\
... \\
x(k+N|k)
\end{bmatrix} \\
& +\begin{bmatrix}
u(k|k) \\
u(k+1|k) \\
... \\
u(k+N|k)
\end{bmatrix}^T
\begin{bmatrix}
R\\
0 & R\\
0 & 0 & R\\
0 & 0 & 0 & ...\\
0 & 0 & 0 & 0& R\\
\end{bmatrix}
\begin{bmatrix}
u(k|k) \\
u(k+1|k) \\
... \\
u(k+N|k)
\end{bmatrix} \\
&= (M\mathbf{x}_k+C\mathbf{U}_k)^T \begin{bmatrix}
Q\\
0 & Q\\
0 & 0 & Q\\
0 & 0 & 0 & ...\\
0 & 0 & 0 & 0& Q\\
\end{bmatrix}(\mathbf{M}\mathbf{x}_k+C\mathbf{U}_k)
+ \mathbf{U}_k^T
\begin{bmatrix}
R\\
0 & R\\
0 & 0 & R\\
0 & 0 & 0 & ...\\
0 & 0 & 0 & 0& R\\
\end{bmatrix}\mathbf{U}_k \\
&= (M\mathbf{X}_k+C\mathbf{U}_k)^T\overline{\mathbf{Q}}(M\mathbf{X}_k+C\mathbf{U}_k)+\mathbf{U}_k^T\overline{\mathbf{R}}\mathbf{U}_k \\
&= \mathbf{X}_k^TM^T\overline{\mathbf{Q}}M\mathbf{X}_k
+\mathbf{x}_k^T\mathbf{M}^T\overline{\mathbf{Q}}\mathbf{C}\mathbf{U}_k
+\mathbf{U}_k^T\mathbf{C}^T\overline{\mathbf{Q}}\mathbf{M}\mathbf{X}_k
+\mathbf{U}_k^TC^T\overline{\mathbf{Q}}C\mathbf{U}_k
+\mathbf{U}_k^T\overline{\mathbf{R}}\mathbf{U}_k \\

\end{aligned}
\end{equation}
$$

::: tip
- 代价函数中每一项算出来都是一个实数，因此每一项的转置就等于其本身。

$$
\mathbf{X}_k^T\mathbf{M}^T\overline{\mathbf{Q}}\mathbf{C}\mathbf{U}_k
= (\mathbf{U}_k^T\mathbf{C}^T\overline{\mathbf{Q}}\mathbf{M}\mathbf{X}_k)^T
= \mathbf{U}_k^T\mathbf{C}^T\overline{\mathbf{Q}}\mathbf{M}\mathbf{X}_k
$$
- $\mathbf{x}_k$ 时开始时刻的状态，$\mathbf{X}$时是预测区间的所有状态。 
:::

令 $\mathbf{G} = \mathbf{M}^T\overline{\mathbf{Q}}\mathbf{M}$,
$\mathbf{E} = \mathbf{M}^T\overline{\mathbf{Q}}\mathbf{C}$,
$\mathbf{H} = C^T\overline{\mathbf{Q}}C +\overline{\mathbf{R}}$
所以其二次型形式为
$$
J= \mathbf{x}_k^T \mathbf{G}\mathbf{x}_k + 2 \mathbf{x}_k^T  \mathbf{E}\mathbf{U}_k + \mathbf{U}_k^T\mathbf{H}\mathbf{U}_k
$$

第一项与$\mathbf{U}$ 无关，省略掉，最后变为标准的二次型

$$
J= \mathbf{U}_k^T\mathbf{H}\mathbf{U}_k + 2 \mathbf{x}_k^T  \mathbf{E}\mathbf{U}_k
$$


### MPC控制流程

总结以下MPC控制的流程，在k时刻
:::: steps
1. 估计/测量当前系统状态$\mathbf{x}_k$


2. 对 $\mathbf{U}=\begin{bmatrix}\mathbf{u}(k|k),\mathbf{u}(k+1|k),...,\mathbf{u}(k+N|k)\end{bmatrix}^T$ 做最优化

    代价函数为
    $$
    J= \mathbf{U}_k^T\mathbf{H}\mathbf{U}_k + 2 \mathbf{x}_k^T  \mathbf{E}\mathbf{U}_k
    $$
    其中
    - $\mathbf{E} = \mathbf{M}^T\overline{\mathbf{Q}}\mathbf{C}$,
    - $\mathbf{H} = C^T\overline{\mathbf{Q}}C +\overline{\mathbf{R}}$
    - $\mathbf{M} = \begin{bmatrix}I, A , A^2 , A^3 , ... , A^N\end{bmatrix}^T$
    - $\mathbf{C} = \begin{bmatrix}
                    0\\
                    B\\
                    AB & B \\
                    A^2B & AB & B\\
                    A^3B & A^2B & AB & B\\
                    \end{bmatrix}
    $
    - Q 与 R 是要调整的参数，这是一个对角矩阵
    - A 与 B 来自状态空间方程


    


3. 只取 $u(k|k)$
::::




## 例子:四旋翼LMPC,High Level control

对于一个四旋翼飞行器跟踪轨迹的任务
::: info
以IPC中的模型为例,由于四旋翼的微分平坦特性，不在MPC中考虑Yaw轴，其中使用[ospq-eigen]()求解QP问题,ospq文档中有一个[MPC使用osqp求解的例子](https://robotology.github.io/osqp-eigen/md_pages_mpc.html)
:::


### 期望(9,1)

$$
\mathbf{x}_0 = 
\begin{bmatrix} p_x^{goal},p_y^{goal},p_z^{goal},v_x^{goal},v_y^{goal},v_z^{goal},a_x^{goal},a_y^{goal}
,a_z^{goal}
\end{bmatrix}^T
$$

在一个预测区间(prediction horizon)中写成
$$
\mathbf{X}_r = 
\begin{bmatrix} \mathbf{x}_0,\mathbf{x}_1,\mathbf{x}_2 ,... ,\mathbf{x}_{step}\end{bmatrix}
$$

### 状态(9,1)


$$
\mathbf{X}_0 = 
\begin{bmatrix} p_x^{now} ,p_y^{now},p_z^{now},v_x^{now},v_y^{now},v_z^{now},a_x^{now},a_y^{now},a_z^{now}
\end{bmatrix}
$$


### 系统模型System Model，状态空间方程

==微分平坦==建立输入 u(jerk) 和 角速度的关系

在 world_frame下
$$
\begin{array}{l}
\mathbf{p}_{n}=\mathbf{p}_{n-1}+\Delta t \cdot \mathbf{v}_{n-1}+\frac{1}{2} \Delta t^{2} \cdot \mathbf{a}_{n-1}+\frac{1}{6} \Delta t^{3} \cdot \mathbf{j}_{n-1} \\
\mathbf{v}_{n}=\mathbf{v}_{n-1}+\Delta t \cdot \mathbf{a}_{n-1}+\frac{1}{2} \Delta t^{2} \cdot \mathbf{j}_{n-1} \\
\mathbf{a}_{n}=\mathbf{a}_{n-1}+\Delta t \cdot \mathbf{j}_{n-1} \\
\mathbf{x}_{n}=\left[\mathbf{p}_{n}, \mathbf{v}_{n}, \mathbf{a}_{n}\right]^{T}, \quad \mathbf{u}_{n}=\mathbf{j}_{n}
\end{array}
$$

写成 $x(k+1) = Ax(k)+Bu(k)$ 的形式

即 A()
$$
\begin{aligned}
\mathbf{x}(k+1)&= \left[\mathbf{p}_{k+1}, \mathbf{v}_{k+1}, \mathbf{a}_{n}\right]^{k+1}\\
&=\\
\end{aligned}

$$

$$
f = ((\mathbf{X}_0^T \times M^T - X_r^T)\times Q_{bar} \times \mathbf{C})^T
$$

### 代价函数


## 
状态（9）：
- pos_x,pos_y,pos_z
- vel_x,vel_y,vel_z
- acc_x,acc_y,acc_z

> MPC_HORIZON 和 step 有什么不一样

M (9 * MPC_HORIZON,9)
C  (9 * MPC_HORIZON,3 * MPC_HORIZON)

$$
M = 
$$






## 模型

$$
\begin{equation}
\begin{aligned}
\frac{\partial x(t)}{\partial t}  &= 
Ax+Bu \\
Y &= Cx

\end{aligned}
\end{equation}
$$

$$
x = (pos_x,pos_y,pos_z,vel_x,vel_y,vel_z,pos_y,acc_y,acc_z)^T
$$

$$

$$


A (9,9) B (9,3)

$$
A = \begin{bmatrix} 
1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0\\
0 & 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0\\
t & 0 & 0 & 1-D_xt & 0 & 0 & t & 0 & 0\\
0 & t & 0 & 0 & 1-D_yt & 0 & 0 & t & 0\\
0 & 0 & t & 0 & 0 & 1-D_zt & 0 & 0 & t\\
\frac{t^2}{2} & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0\\
0 & \frac{t^2}{2}  & 0 & 0 & 0 & 0 & 0 & 1 & 0\\
0 & 0 & \frac{t^2}{2} & 0 & 0 & 0 & 0 & 0 & 1\\
\end{bmatrix}
$$




$$
B = \begin{bmatrix} 
\frac{t^3}{6} & 0 & 0 \\
0 & \frac{t^3}{6} & 0 \\
0 & 0 & \frac{t^3}{6} \\
\frac{t^2}{2} & 0 & 0 \\
0 & \frac{t^2}{2} & 0 \\
0 & 0 & \frac{t^2}{2} \\
t & 0 & 0 \\
0 & t  & 0\\
0 & 0 & t\\
\end{bmatrix}
$$





一个受约束的非线性优化问题

$$
\mathbf{u}_{NMPC}=arg\min_{\mathbf{u}}\sum_{k=0}^{N-1}(
\parallel \mathbf{x}_k-\mathbf{x}_{k,r}\parallel^2_Q+
\parallel \mathbf{u}_k-\mathbf{u}_{k,r}\parallel^2_{Q_u}
)+\parallel \mathbf{x}_N-\mathbf{x}_{N,r}\parallel^2_{Q_N}
$$

$$
\begin{array}{l}
\text { s.t. } \quad \boldsymbol{x}_{k+1}=\boldsymbol{f}\left(\boldsymbol{x}_{k}, \boldsymbol{u}_{k}\right), \quad \boldsymbol{x}_{0}=\boldsymbol{x}_{\text {init }}, \\
\boldsymbol{\Omega}^{B} \in\left[\begin{array}{ll}
\boldsymbol{\Omega}_{\min }^{B} & \boldsymbol{\Omega}_{\max }^{B}
\end{array}\right], \quad \boldsymbol{u} \in\left[\begin{array}{ll}
\boldsymbol{u}_{\min } & \boldsymbol{u}_{\max }
\end{array}\right] \\
\end{array}
$$

[^kong_zhi_zhi_mei]: 控制之美卷2，第三章最优控制的基本概念。