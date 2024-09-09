---
title: 四旋翼模型
createTime: 2024/09/07 00:42:11
permalink: /robot_base/fnhcttex/
---

## 什么是微分平坦(DFBC ,Differential-Flatness-Based Control)？

设定 x 为系统状态，u 为系统输入(控制)

一个微分平坦的动力系统必定存在一组由状态 x 和控制 u 的有限阶导数唯一决定的平坦输出（Flat Output）$z\in\mathbb{R}^m$  , 同时 x 和 u 也可以被该平坦输出及其有限阶 导数参数化


即一组平坦输出$z\in\mathbb{R}^m$，以及这组平坦输出的有限阶导数，通过一个变化(平坦变换)，可以得到

:::info
"Flat output" 是一个在控制系统和系统理论中常见的概念，特别是在非线性系统的研究中。它指的是将系统的输出（output）通过一些操作，使其能够被表示为输入（input）和系统状态（state）的函数，而不包含输出的导数或更高阶的导数。
具体来说，**在一个动态系统中，如果系统的输出可以通过输入和状态的某种组合来表示，并且不包含输出的导数或更高阶导数，那么这个输出被称为"flat output"**。这种形式的输出对于系统建模、控制器设计和系统分析都非常有用。
:::




## uzh-rpg的 四旋翼模型

- High Level Control
- Low Level Control

High Level Control 为 位置控制。

<!-- # 微分平坦证明 -->

> M. Faessler, A. Franchi, and D. Scaramuzza, “Differential flatness of quadrotor dynamics subject to rotor drag for accurate tracking of high-speed trajectories,” IEEE Robot. Autom.Lett., vol. 3, pp. 620–626,Apr. 2018.

$$ \dot{\mathbf{v}} = -g\mathbf{z}\_w + c\mathbf{z}\_b - RDR^T\mathbf{v} $$

由上式可**派生**出

$$ \begin{aligned} \mathbf{x\_B}^T(\dot{\mathbf{v}}+g\mathbf{z}\_w+d\_x\mathbf{v})=0 \ \mathbf{y\_B}^T(\dot{\mathbf{v}}+g\mathbf{z}\_w+d\_x\mathbf{v})=0 \end{aligned} $$

为了使用 reference heading， 我们 将 $\mathbf{X}\_B$ 投影到世界坐标系的平面上，与投影到世界坐标系的xy平面上，与X\_c$共线(collinear)


## 参考源码

Omnidrones，


# 
## cf2x_pid
emmmmm 这是没用用的东西,白看半天

1. Set_param
```python
# force
self.P_COEFF_FOR = torch.tensor([0.4, 0.4, 1.25], device=device)
self.I_COEFF_FOR = torch.tensor([0.05, 0.05, 0.05], device=device)
self.D_COEFF_FOR = torch.tensor([0.2, 0.2, 0.5], device=device)
# torque
self.P_COEFF_TOR = torch.tensor([70000.0, 70000.0, 60000.0], device=device)
self.I_COEFF_TOR = torch.tensor([0.0, 0.0, 500.0], device=device)
self.D_COEFF_TOR = torch.tensor([20000.0, 20000.0, 12000.0], device=device)
```

2. Get_error

```python
    pos_e = target_pos - cur_pos
    vel_e = target_vel - cur_vel
    # i item
    integral_pos_e = integral_pos_e + pos_e * control_timestep
    # i limited
    integral_pos_e = torch.clip(integral_pos_e, -2.0, 2.0)
    integral_pos_e[..., 2] = torch.clip(integral_pos_e[..., 2], -0.15, 0.15)

```
3. Calc_Translation
 ```python
 cur_rotation = quaternion_to_rotation_matrix(cur_quat)  # (*, 3, 3)
 target_thrust = (
  P_COEFF_FOR * pos_e
  + I_COEFF_FOR * integral_pos_e
  + D_COEFF_FOR * vel_e
  + GRAVITY
  )
 # 将新的推力期望投影到机体坐标的z轴方向并计算推力大小， 单位
 scalar_thrust = (
      (target_thrust * cur_rotation[..., :, 2]).sum(-1, keepdim=True).clamp_min(0)
)
# PWM2RPM
thrust = (torch.sqrt(scalar_thrust / (4 * KF)) - bias_{PWM2RPM}) / PWM2RPM_SCALE

```




$$
thrust \times SCALE_{ PWM2RPM} + bias_{PWM2RPM} = \sqrt{\frac{scalar_{thrust}}{4\times k_f}}
$$


4. set torque

混控
```python
self.MIXER_MATRIX = torch.tensor(
    [
        [-0.5, -0.5, 1],  # 3
        [-0.5, 0.5, -1],  # 2
        [0.5, 0.5, 1],  # 1
        [0.5, -0.5, -1],  # 0
    ],
    device=device,
)
cur_rpy = quaternion_to_euler(cur_quat)
```


5. Get Exp_rot  
```python
target_z_ax = target_thrust / (
    torch.norm(target_thrust, dim=-1, keepdim=True) + EPS
)
target_y_ax = torch.cross(target_z_ax, target_x_c, dim=-1)
target_y_ax /= torch.norm(target_y_ax, dim=-1, keepdim=True) + EPS
target_x_ax = torch.cross(target_y_ax, target_z_ax, dim=-1)
target_rotation = torch.stack([target_x_ax, target_y_ax, target_z_ax], dim=-1)
```
5. Calc attitude 
  
```python
cur_rpy = quaternion_to_euler(cur_quat)

rot_matrix_e = torch.matmul(
    target_rotation.transpose(-1, -2), cur_rotation
) - torch.matmul(cur_rotation.transpose(-1, -2), target_rotation)

rot_e = torch.stack(
    [rot_matrix_e[..., 2, 1], rot_matrix_e[..., 0, 2], rot_matrix_e[..., 1, 0]],
    dim=-1,
)
rpy_rates_e = target_rpy_rates - (cur_rpy - last_rpy) / control_timestep

integral_rpy_e = integral_rpy_e - rot_e * control_timestep
integral_rpy_e.clamp_(-1500.0, 1500.0)
integral_rpy_e[..., :2].clamp_(-1.0, 1.0)
#### PID target torques ####################################
target_torques = (
    -P_COEFF_TOR * rot_e + D_COEFF_TOR * rpy_rates_e + I_COEFF_TOR * integral_rpy_e
)

target_torques = torch.clip(target_torques, -3200, 3200)
```

# 实际用的

```python
if action_transform is not None:
    if action_transform.startswith("multidiscrete"):
        nbins = int(action_transform.split(":")[1])
        transform = FromMultiDiscreteAction(nbins=nbins)
        transforms.append(transform)
    elif action_transform.startswith("discrete"):
        nbins = int(action_transform.split(":")[1])
        transform = FromDiscreteAction(nbins=nbins)
        transforms.append(transform)
    elif action_transform == "velocity":
        from omni_drones.controllers import LeePositionController
        controller = LeePositionController(9.81, base_env.drone.params).to(base_env.device)
        transform = VelController(torch.vmap(controller))
        transforms.append(transform)
    elif action_transform == "rate":
        from omni_drones.controllers import RateController as _RateController
        controller = _RateController(9.81, base_env.drone.params).to(base_env.device)
        transform = RateController(controller)
        transforms.append(transform)
    elif action_transform == "attitude":
        from omni_drones.controllers import AttitudeController as _AttitudeController
        controller = _AttitudeController(9.81, base_env.drone.params).to(base_env.device)
        transform = AttitudeController(torch.vmap(torch.vmap(controller)))
        transforms.append(transform)
    elif not action_transform.lower() == "none":
        raise NotImplementedError(f"Unknown action transform: {action_transform}")
```

- velocity
- rate
- attitude




# 动力学模型

# 微分方程求解
- isaacsim
- [gazebo](http://classic.gazebosim.org/tutorials?tut=physics_params&cat=physics)


## Gazebo 电机模型

```c++
void GazeboMotorModel::UpdateForcesAndMoments() {
  // 获取当前速度，这里的速度是在仿真中看到的速度，模型没有设置阻尼系数，所以设置多少就是多少
  motor_rot_vel_ = joint_->GetVelocity(0);
  // 希望不要转的太快,降低仿真性能需求
  if (motor_rot_vel_ / (2 * M_PI) > 1 / (2 * sampling_time_)) {
    gzerr << "Aliasing on motor [" << motor_number_ << "] might occur. Consider making smaller simulation time steps or raising the rotor_velocity_slowdown_sim_ param.\n";
  }
  // rotor_velocity_slowdown_sim_： 使得可视化的转速比较慢，降低仿真性能需求
  double real_motor_velocity = motor_rot_vel_ * rotor_velocity_slowdown_sim_;
  // 转速到力的映射： 这里只用了二次项，丢掉的低阶项
  double force = real_motor_velocity * std::abs(real_motor_velocity) * motor_constant_;
  if(!reversible_) {
    // Not allowed to have negative thrust.
    force = std::abs(force);
  }

  // scale down force linearly with forward speed
  // XXX this has to be modelled better
  //
#if GAZEBO_MAJOR_VERSION >= 9
  ignition::math::Vector3d body_velocity = link_->WorldLinearVel();
  ignition::math::Vector3d joint_axis = joint_->GlobalAxis(0);
#else
  ignition::math::Vector3d body_velocity = ignitionFromGazeboMath(link_->GetWorldLinearVel());
  ignition::math::Vector3d joint_axis = ignitionFromGazeboMath(joint_->GetGlobalAxis(0));
#endif

  ignition::math::Vector3d relative_wind_velocity = body_velocity - wind_vel_;
  // 计算电机轴方向的风力
  ignition::math::Vector3d velocity_parallel_to_rotor_axis = (relative_wind_velocity.Dot(joint_axis)) * joint_axis;
  double vel = velocity_parallel_to_rotor_axis.Length();
  //风对转速的影响
  double scalar = 1 - vel / 25.0; // at 25 m/s the rotor will not produce any force anymore
  scalar = ignition::math::clamp(scalar, 0.0, 1.0);
  // Apply a force to the link.
  // 施加升力
  link_->AddRelativeForce(ignition::math::Vector3d(0, 0, force * scalar));

  // Forces from Philppe Martin's and Erwan Salaün's
  // 2010 IEEE Conference on Robotics and Automation paper
  // The True Role of Accelerometer Feedback in Quadrotor Control
  // - \omega * \lambda_1 * V_A^{\perp}
  // 去掉升力方向上的升力，因为上面算过了
  ignition::math::Vector3d velocity_perpendicular_to_rotor_axis = relative_wind_velocity - (relative_wind_velocity.Dot(joint_axis)) * joint_axis;
  // 计算风阻
  ignition::math::Vector3d air_drag = -std::abs(real_motor_velocity) * rotor_drag_coefficient_ * velocity_perpendicular_to_rotor_axis;
  // Apply air_drag to link.
  // 施加风阻
  link_->AddForce(air_drag);
  // Moments
  // Getting the parent link, such that the resulting torques can be applied to it.
  physics::Link_V parent_links = link_->GetParentJointsLinks();
  // The tansformation from the parent_link to the link_.
 // 考虑 奇怪安装方式的电机
#if GAZEBO_MAJOR_VERSION >= 9
  ignition::math::Pose3d pose_difference = link_->WorldCoGPose() - parent_links.at(0)->WorldCoGPose();
#else
  ignition::math::Pose3d pose_difference = ignitionFromGazeboMath(link_->GetWorldCoGPose() - parent_links.at(0)->GetWorldCoGPose());
#endif
  // 计算阻力力矩
  ignition::math::Vector3d drag_torque(0, 0, -turning_direction_ * force * moment_constant_);
  // Transforming the drag torque into the parent frame to handle arbitrary rotor orientations.
  ignition::math::Vector3d drag_torque_parent_frame = pose_difference.Rot().RotateVector(drag_torque);
  // 施加阻力力矩，作用在BaseLink
  parent_links.at(0)->AddRelativeTorque(drag_torque_parent_frame);

  ignition::math::Vector3d rolling_moment;
  // - \omega * \mu_1 * V_A^{\perp}
  // 计算力矩，作用在BaseLink
  rolling_moment = -std::abs(real_motor_velocity) * turning_direction_ * rolling_moment_coefficient_ * velocity_perpendicular_to_rotor_axis;
  parent_links.at(0)->AddTorque(rolling_moment);
  // Apply the filter on the motor's velocity.
  double ref_motor_rot_vel;
  ref_motor_rot_vel = rotor_velocity_filter_->updateFilter(ref_motor_rot_vel_, sampling_time_);
  // 更新新的转速，转速来自于VelocityCallback
  joint_->SetVelocity(0, turning_direction_ * ref_motor_rot_vel / rotor_velocity_slowdown_sim_);
}
```


## 动力学模型

## 一般模型(对于X模型)

油门模型

$$
\begin{aligned}
f(u) &= k_2^fu^2+k_1^fu+k_0^f \\
\tau(u)&= k_2^{\tau}u^2+k_1^{\tau}u+k_0^{\tau} \\
\end{aligned}
$$

混控模型

$$
\begin{aligned}
\boldsymbol{\eta} & =\left[\begin{array}{c}
\frac{\sqrt{2}}{2} l\left(f_{1}-f_{2}-f_{3}+f_{4}\right) \\
\frac{\sqrt{2}}{2} l\left(-f_{1}-f_{2}+f_{3}+f_{4}\right) \\
\kappa_{1} f_{1}-\kappa_{2} f_{2}+\kappa_{3} f_{3}-\kappa_{4} f_{4}
\end{array}\right], \\
m c & =f_{1}+f_{2}+f_{3}+f_{4},
\end{aligned}
$$

动力学模型

$$
\begin{array}{l}
\dot{\mathbf{p}}=\mathbf{v} \\
\dot{\mathbf{v}}=-g \mathbf{z}_{\mathrm{w}}+c \mathbf{z}_{\mathrm{B}}-\mathbf{R D} \mathbf{R}^{\top} \mathbf{v} \\
\dot{\mathbf{R}}=\mathbf{R} \hat{\boldsymbol{\omega}} \\
\dot{\boldsymbol{\omega}}=\mathbf{J}^{-1}\left(\boldsymbol{\eta}-\boldsymbol{\omega} \times \mathbf{J} \boldsymbol{\omega}-\boldsymbol{\tau}_{\mathrm{g}}-\mathbf{A} \mathbf{R}^{\top} \mathbf{v}-\mathbf{B} \boldsymbol{\omega}\right) \\
\dot{\boldsymbol{\eta}}=\frac{1}{\alpha_{\mathrm{mot}}}\left(\boldsymbol{\eta}_{\mathrm{des}}-\boldsymbol{\eta}\right)
\end{array}
$$


# 实际使用 (rai)


油门模型

$$
\begin{aligned}
f(u) &= k_2^fu^2 \\
\tau(u)&= k_2^{\tau}u^2\\
\end{aligned}
$$

混控模型

$$
\begin{aligned}
\boldsymbol{\eta} & =\left[\begin{array}{c}\frac{\sqrt{2}}{2} l\left(f_{1}-f_{2}-f_{3}+f_{4}\right)\\
\frac{\sqrt{2}}{2} l\left(-f_{1}-f_{2}+f_{3}+f_{4}\right) \\
\kappa_{1} f_{1}-\kappa_{2} f_{2}+\kappa_{3} f_{3}-\kappa_{4} f_{4}\end{array}\right],\\
m c & =f_{1}+f_{2}+f_{3}+f_{4},
\end{aligned}
$$

动力学模型

$$
\begin{aligned}
\dot{\mathbf{p}} &= \mathbf{v} \\
\dot{\mathbf{v}} &= -g \mathbf{z}_{\mathrm{w}} + c \mathbf{z}_{\mathrm{B}}  \\
\end{aligned}
$$



# 构型与混控器矩阵

\+ 型
```bash
+
    1             x
    *             |
    *          y--O
3 ***** 4      
    *
    *
    2
```

$$
\mathbf{M} = 
\begin{bmatrix}
0 & 0 & l & -l \\
-l & l & 0 & 0 \\
d & d & -d & -d \\
t & t & t & t
\end{bmatrix}
$$


X 型
```bash
X
1       2
  *   *             x
    *               |
  *   *          y--O
4       3      
```

$$
\mathbf{M} = 
\begin{bmatrix}
\sqrt{2}l & -\sqrt{2}l & -\sqrt{2}l & \sqrt{2}l \\
-\sqrt{2}l & -\sqrt{2}l & \sqrt{2}l & \sqrt{2}l \\
d & -d & d & -d \\
t & t & t & t
\end{bmatrix}
$$



## uzh 动力学模型

令 $\mathbf{\mu}$ 为机体坐标系下的 控制力矩。$\mathbf{\omega}$ 为四维向量，代表四个电机的旋转速度，且$\mathbf{\omega}>\mathbf{0}$ 。总推力为T，方向为$\mathbf{z}_b$，则

$$
\begin{bmatrix} \mathbf{\mu}_c\\T_c\end{bmatrix}=\mathbf{G}_1 \mathbf{\omega}_c^{\circ2}+\mathbf{G}_2 \mathbf{\dot{\omega}}
$$

其中$\mathbf{G}_2$代表直接由

这里在绕$\mathbf{z}_b$方向旋转的力产生了两种，
1. 来自于螺旋桨的力矩
2. 来自于电机的力矩$G_2$,这个力矩是

一般来说电机个惯性非常小，对于飞行器力矩的影响很少，所以经常被忽略
