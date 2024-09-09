---
title: simple_mpc
createTime: 2024/09/09 17:07:21
permalink: /0m313cht/
---






# 名词
有限时间最优控制问题,
滚动优化控制（Receding Horizon Control）

# 线性MPC(LMPC)




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

# set-goal

$$
\mathbf{x}_0 = 
\begin{bmatrix} p_x^{goal} \\
p_y^{goal}\\
p_z^{goal}\\
v_x^{goal} \\
v_y^{goal}\\
v_z^{goal}\\
a_x^{goal} \\
a_y^{goal}\\
a_z^{goal}\\
\end{bmatrix}
$$


$$
\mathbf{X}_r = 
\begin{bmatrix} 
\mathbf{x}_0 \\
\mathbf{x}_1 \\
\mathbf{x}_2 \\
... \\
\mathbf{x}_{step} \\

\end{bmatrix}
$$



Status (9,1)
$$
\mathbf{X}_0 = 
\begin{bmatrix} p_x^{now} \\
p_y^{now}\\
p_z^{now}\\
v_x^{now} \\
v_y^{now}\\
v_z^{now}\\
a_x^{now} \\
a_y^{now}\\
a_z^{now}\\
\end{bmatrix}
$$


$$
f = ((\mathbf{X}_0^T \times M^T - X_r^T)\times Q_{bar} \times \mathbf{C})^T
$$




# System Model
状态（9）：
- pos_x
- pos_y
- pos_z
- vel_x
- vel_y
- vel_z
- acc_x
- acc_y
- acc_z



- MPC_HORIZON

> MPC_HORIZON 和 step 有什么不一样

M (9 * MPC_HORIZON,9)
C  (9 * MPC_HORIZON,3 * MPC_HORIZON)

$$
M = 
$$





# MPC 的线性项与二次项





# IPC 中的MPC控制器


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

# 二次型的标准形式

$$
min \mathbf{Z}^T\mathbf{Q}\mathbf{Z} + \mathbf{C}^T\mathbf{Z}
$$

## MPC 的优化问题是


$$
J = \int_{0}^{x} (E^TQE + u^TRu)dt
$$



对于 

$$
 x(k+1) = Ax(k)+Bu(k)
$$

mpc会预测一段时间 （predictive horizon）

此时代价函数为

$$
\min{\mathbf{J}}= \sum_{i=0}^{N-1} \mathbf{x}_{k+i|k}^T\mathbf{Q}\mathbf{x}_{k+i|k} + \mathbf{u}_{k+i|k}^T\mathbf{Q}\mathbf{u}_{k+i|k} + 
$$
将predictive horizon中所有的x 写到一起

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
同理 将u写到一起
$$
\mathbf{U}_k=
\begin{bmatrix} 
\mathbf{u}(k|k),\mathbf{u}(k+1|k),...,\mathbf{u}(k+N|k)
\end{bmatrix}^T
$$

令 

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
&= (M\mathbf{X}_k+C\mathbf{U}_k)^T \begin{bmatrix}
Q\\
0 & Q\\
0 & 0 & Q\\
0 & 0 & 0 & ...\\
0 & 0 & 0 & 0& Q\\
\end{bmatrix}(M\mathbf{X}_k+C\mathbf{U}_k)
+ \mathbf{U}_k^T
\begin{bmatrix}
R\\
0 & R\\
0 & 0 & R\\
0 & 0 & 0 & ...\\
0 & 0 & 0 & 0& R\\
\end{bmatrix}\mathbf{U}_k \\
&= 

\end{aligned}
\end{equation}
$$

上



