---
title: 固件修改记录
createTime: 2024/09/07 00:32:08
permalink: /px4code/oiyurg2e/
---

# VINS 兼容的修改 V1.13.3

`HIGHRES_IMU` 中修改  175 行左右
```C++
	// const Vector3f accel = (Vector3f{imu.delta_velocity} * accel_dt_inv);
			const Vector3f accel = (Vector3f{imu.delta_velocity} * accel_dt_inv) - accel_bias;
```
修改 181 行左右
```c++
const Vector3f gyro = (Vector3f{imu.delta_angle} * gyro_dt_inv) - gyro_bias;
// const Vector3f gyro = (Vector3f{imu.delta_angle} * gyro_dt_inv);
```
  

`Ekf::fuse` 中注释掉  `delta_ang_bias` 和 `delta_vel_bias`
```c++
void Ekf::fuse(const Vector24f &K, float innovation)
{
	_state.quat_nominal -= K.slice<4, 1>(0, 0) * innovation;
	_state.quat_nominal.normalize();
	_state.vel -= K.slice<3, 1>(4, 0) * innovation;
	_state.pos -= K.slice<3, 1>(7, 0) * innovation;
	// _state.delta_ang_bias -= K.slice<3, 1>(10, 0) * innovation;
	// _state.delta_vel_bias -= K.slice<3, 1>(13, 0) * innovation;
	_state.mag_I -= K.slice<3, 1>(16, 0) * innovation;
	_state.mag_B -= K.slice<3, 1>(19, 0) * innovation;
	_state.wind_vel -= K.slice<2, 1>(22, 0) * innovation;
}
```
# 修改 默认Mavlink部分消息发送频率  V1.13.3

对于通过usb使用的mavlink,在 mavlink_main.cpp 1688行左右 case MAVLINK_MODE_CONFIG: 中修改对应的频率,以监控

```c++
configure_stream_local("LOCAL_POSITION_NED", 100.0f);
configure_stream_local("ATTITUDE_TARGET", 100.0f);
configure_stream_local("HIGHRES_IMU", 200.0f);

```

TODO: 不同 mavlink 模式见的区别
```c++
	enum MAVLINK_MODE {
		MAVLINK_MODE_NORMAL = 0,
		MAVLINK_MODE_CUSTOM,
		MAVLINK_MODE_ONBOARD,
		MAVLINK_MODE_OSD,
		MAVLINK_MODE_MAGIC,
		MAVLINK_MODE_CONFIG,   //注释写的就是usb
		MAVLINK_MODE_IRIDIUM,
		MAVLINK_MODE_MINIMAL,
		MAVLINK_MODE_EXTVISION,
		MAVLINK_MODE_EXTVISIONMIN,
		MAVLINK_MODE_GIMBAL,
		MAVLINK_MODE_ONBOARD_LOW_BANDWIDTH,
		MAVLINK_MODE_COUNT
	};
```