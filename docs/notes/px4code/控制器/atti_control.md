---
title: AttiControl
createTime: 2024/09/06 23:36:40
permalink: /px4code/controller/iejazgwj/
---
# 姿态控制器

## 源码位置



rlPx4Ctrl 使用Eigen实现了Px4飞控中四旋翼部分的主要控制逻辑，包括
- 位置环
- 姿态环
- 角速度环
- 混控器
# 位置环

px4位置环的部分来源于这篇[学术报告](https://www.research-collection.ethz.ch/bitstream/handle/20.500.11850/154099/eth-7387-01.pdf), 其构建了一套四元数控制算法，并在报告中做了证明，这里不再赘述。总之其控制算法如下所示
$$
\vec{\Omega}_{c m d}(\mathbf{q})=\frac{2}{\tau} \operatorname{sgn}\left(q_{e, 0}\right) \mathbf{q}_{\mathbf{e}, 1: 3}, \quad \operatorname{sgn}\left(q_{e, 0}\right)=\left\{\begin{array}{ll}
1, & q_{e, 0} \geq 0 \\
-1, & q_{e, 0}<0
\end{array}\right.
$$
在这个控制算法中，只有一个控制参数 $\tau$ 叫做时间常数，在代码中参数 ${gain}=\frac{1}{t}$


## 坐标系

与px4 不同 rlpx4ctrl使用 机器人坐标系即 ENU（world frame） 和body，
在姿态环坐标变换为
$$
qe_{Body}^{desBody}  = (q_{ENU}^{desBody} )^{-1}q_{ENU}^{Body} 
$$
简化一下
$$
\mathbf{q}_{\mathbf{e}}:=\mathbf{q}^{-1} \cdot \mathbf{q}_{\mathbf{c m d}}
$$
## 混合姿态控制
> yaw 轴缩小了期望角度，但是提高了gain

去掉yaw的部分叫 $_{body}q_{red}^{desBodyNoYaw}$ 将其转换到  $_{ENU}q_{red}^{desBodyNoYaw}$ , 

$$
q_{mix} = _{desBodyNoYaw}q_{mix}^{desBody} = (_{enu}q_{red}^{desBodyNoYaw})^{-1}{_{enu}q_{red}^{desBody}}
$$

因此 $q_{mix}$ 应该满足 ,只有 (w,0,0,z) ,

```c++
Eigen::Vector3d Px4AttitudeController::update(const Eigen::Quaterniond &q,const Eigen::Quaterniond &attitude_setpoint_q)
{
	// 期望，反馈坐标系 均为 world
    Eigen::Quaterniond qd = attitude_setpoint_q;
    Eigen::Vector3d e_z = q.toRotationMatrix().col(2);
    Eigen::Vector3d e_z_d = qd.toRotationMatrix().col(2);

    Eigen::Quaterniond qd_red = getAttiErr(e_z,e_z_d);// qd_red 已经 normalize了

	if (fabsf(qd_red.x()) > (1.f - 1e-5f) || fabsf(qd_red.y()) > (1.f - 1e-5f)) {
        // 当 四元数中的 x或y项非常接近1时， 当前推力朝向与目标推力朝向完全相反，此时Full attitude control 不会产生任何Yaw角输入
        // 而是直接采用Roll和Pitch的组合，从而获得正确的Yaw.忽略这种情况仍然是安全和稳定的。
		// In the infinitesimal corner case where the vehicle and thrust have the completely opposite direction,
		// full attitude control anyways generates no yaw input and directly takes the combination of
		// roll and pitch leading to the correct desired yaw. Ignoring this case would still be totally safe and stable.
		qd_red = qd; 

	} else {
		// transform rotation from current to desired thrust vector into a world frame reduced desired attitude
		//qd_red 是在 Body下的desBody 需要转换到ENU坐标下
		qd_red *= q;
	}

	// mix full and reduced desired attitude
	Eigen::Quaterniond q_mix = qd_red.inverse() * qd;
	q_mix = eigen_canonical(q_mix); // 
	// catch numerical problems with the domain of acosf and asinf
	q_mix.w() = MyMath::constrain(q_mix.w(), (double)-1.f, (double)1.f);
	q_mix.z() = MyMath::constrain(q_mix.z(), (double)-1.f, (double)1.f);
	qd = qd_red * Eigen::Quaterniond(cosf(_yaw_w * acosf(q_mix.w())), 0, 0, sinf(_yaw_w * asinf(q_mix.z()))); //缩放期望角度 _yaw_w 来源于参考资料中的测试结果，这里是四元数转角度，然后缩放，最后转回到四元数
	
	// quaternion attitude control law, qe is rotation from q to qd
	Eigen::Quaterniond qe = q.inverse() * qd;

	// using sin(alpha/2) scaled rotation axis as attitude error (see quaternion definition by axis angle)
	// also taking care of the antipodal unit quaternion ambiguity
    
	qe = eigen_canonical(qe);
	Eigen::Vector3d eq (qe.x(),qe.y(),qe.z());
	eq *= 2.f;

	// calculate angular rates setpoint
	Eigen::Vector3d rate_setpoint = eq.cwiseProduct(_proportional_gain);

	// Feed forward the yaw setpoint rate.
	// yawspeed_setpoint is the feed forward commanded rotation around the world z-axis,
	// but we need to apply it in the body frame (because _rates_sp is expressed in the body frame).
	// Therefore we infer the world z-axis (expressed in the body frame) by taking the last column of R.transposed (== q.inversed)
	// and multiply it by the yaw setpoint rate (yawspeed_setpoint).
	// This yields a vector representing the commanded rotatation around the world z-axis expressed in the body frame
	// such that it can be added to the rates setpoint.
    rate_setpoint += q.inverse().toRotationMatrix().col(2)* _yawspeed_setpoint;
    //_yawspeed_setpoint 未启用，问题应该不大。

	// limit rates
	for (int i = 0; i < 3; i++) {
		rate_setpoint(i) = MyMath::constrain(rate_setpoint(i), -_rate_limit(i), _rate_limit(i));
	}

	return rate_setpoint; //frame(body)
}
```

# rate 环

> 仿真环境中的rate 是world下的


$$
\omega_{body}=(q_{enu}^{body})^{-1} \omega_{enu}
$$
> rate 环相较于 px 去掉了前馈量 ，可能是一个问题





# px4 默认参数

```yaml
MC_PITCHRATE_D: 0.001
MC_ROLLRATE_D: 0.001
MC_YAWRATE_D: 0

MC_PITCHRATE_I:	0.2
MC_ROLLRATE_I: 0.25
MC_YAWRATE_I: 0.1

MC_PITCHRATE_P: 0.08
MC_ROLLRATE_P: 0.08
MC_YAWRATE_P: 0.2

MC_PITCHRATE_K: 0.4
MC_ROLLRATE_K: 0.34
MC_YAWRATE_K: 1.2

MC_PR_INT_LIM: 0.3
MC_YR_INT_LIM: 0.3

MC_ROLL_P: 8
MC_PITCH_P: 8
MC_YAW_P: 4
MC_YAW_WEIGHT: 0.4

```
