---
title: auto_tune
createTime: 2024/09/09 17:09:01
permalink: /rcsnfn8s/
---


# mc_autotune_attitude_control

> T.Yamatoto, K.Fujii and M.Kaneda, Design and implementation of a self-tuning pid controller, 1998
> Identification de systemes dynamiques, D.Bonvin and A.Karimi, epfl, 2011

General Minimum Variance Control（GMVC）


## Identification


$$
A(q^{-1})y(k) = q^{-d} * B(q^{-1})u(k) + A(q^{-1})e(k)
$$




# 优化方法

## 最小二乘

> 向量 -> (n行，1列)的列向量


> 二次型


令 $\beta$ 为待优化的参数向量，$\mathbf{x}$为特征向量，$\mathbf{y}$是对应的目标向量
假设一个单目标优化问题，模型如下（$\epsilon$ 为误差项）：
$$
y = \mathbf{x}^T \mathbf{\beta} + \epsilon
$$


$$
min_\beta \sum_{i=1}^{n}(y_i - \mathbf{x}^T_i \beta)^2

$$
或者写成矩阵形式
$$
\begin{equation}
\begin{aligned}
min_\beta &(\mathbf{y} - \mathbf{X}^T \mathbf{\beta})^T(\mathbf{y} - \mathbf{X}^T \mathbf{\beta}) \\
&= \mathbf{y}^T \mathbf{y}  -2\mathbf{y} \mathbf{X}^T \beta + (\mathbf{X^T}\beta)^T(\mathbf{X^T}\beta) \\
\end{aligned}
\end{equation}
$$

对于
$$
J(\beta)= \mathbf{y}^T \mathbf{y}  -2\mathbf{y} \mathbf{X}^T \beta + (\mathbf{X^T}\beta)^T(\mathbf{X^T}\beta)
= \mathbf{y}^T \mathbf{y}  -2\mathbf{y} \mathbf{X}^T \beta + \beta^T \mathbf{X}\mathbf{X^T}\beta
$$


求导令其等于0：
$$
\frac{\partial}{\partial \beta} J(\beta)
= -2\mathbf{y} \mathbf{X}^T + 2\mathbf{X}\mathbf{X^T}\beta=0
$$




