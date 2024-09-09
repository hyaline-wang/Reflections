---
title: 刚体动力学模型
createTime: 2024/09/07 00:48:12
permalink: /robot_base/r8o5kgii/
---

# 刚体动力学模型

刚体动力学关键公式

对于平移 

$$
F=ma
$$

对于旋转(欧拉公式)---[[欧拉方程的推导]]

对于旋转

$$
N=I \cdot \dot{\omega} + \omega \times(I \cdot \omega)
$$
这个公式分两个部分
- $I \cdot \dot{\omega}$ 描述了合外力矩
- $\omega \times(I \cdot \omega)$ 描述了惯性力

:::info
公式可参考[欧拉方程的推导](./math_base.md#欧拉方程的推导)
:::
