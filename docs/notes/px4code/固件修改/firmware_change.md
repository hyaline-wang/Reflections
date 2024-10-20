---
title: 固件修改记录
createTime: 2024/09/07 00:32:08
permalink: /px4code/firmware_change/oiyurg2e/
---

## VINS 兼容的修改

为了让VINS数据可用作为vision_pose传给px4的EKF，需要做以下修改

:::: tabs
@tab V1.13.3
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

@tab V1.15
:::warning TODO
:::
在ekf_help.cpp 下的 void Ekf::fuse(const VectorState &K, float innovation) 函数中注释以下内容
```c++
// // gyro_bias
// _state.gyro_bias = matrix::constrain(_state.gyro_bias - K.slice<State::gyro_bias.dof, 1>(State::gyro_bias.idx,
//                                   0) * innovation,
//                                   -getGyroBiasLimit(), getGyroBiasLimit());

// // accel_bias
// _state.accel_bias = matrix::constrain(_state.accel_bias - K.slice<State::accel_bias.dof, 1>(State::accel_bias.idx,
//                                    0) * innovation,
//                                    -getAccelBiasLimit(), getAccelBiasLimit());

```
::::

## MAVLINK默认回传频率修改

修改 默认Mavlink部分消息发送频率 
:::info
频率修改的位置不同版本有变化,以USB连接为例
- v1.13 MAVLINK_MODE_CONFIG
- v1.15 MAVLINK_MODE_ONBOARD
:::

::: tabs

@tab V1.13
对于通过usb使用的mavlink,在 mavlink_main.cpp 1688行左右 case MAVLINK_MODE_CONFIG: 中修改对应的频率
```c++
configure_stream_local("LOCAL_POSITION_NED", 100.0f);
configure_stream_local("ATTITUDE_TARGET", 100.0f);
configure_stream_local("HIGHRES_IMU", 200.0f); // 用于VIO获取高频率IMU信息
```
:::



:::warning TODO
不同 mavlink 模式的区别
:::
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


## IMU 回报频率修改

在[mavlink默认回传频率修改](firmware_change.md#mavlink默认回传频率修改)中修改了`HIGHRES_IMU`的频率为200hz，但是实际使用时mavros中`/mavros/imu/data_raw`的接收频率约为168hz，且周期不恒定。

接下来探究为什么时168Hz，总结起来分为两个部分
1. mavlink发送程序 mavlink_main.cpp中限制了最大频率。
2. Uorb 中信息发的发布频率。

:::info
Shell 中使用 uorb top 可以看到各个uorb消息的发送频率
:::
消息频率的不稳定一般是mavlink发送程序带来的，如果对稳定有要求所以可以将频率设置为unlimited_rate。

168 hz的由来
> Uorb    sensor_combined

### 247hz稳定办法
在 mavlink_main.cpp中
```c++
//1466行左右
configure_stream_local("HIGHRES_IMU", unlimited_rate);
```
打开QGC修改参数
```
IMU_INTEG_RATE 250
```


<!-- mavlink stream -d /dev/ttyACM0 -s HIGHRES_IMU -r 50 -->


### 200hz稳定办法
在 mavlink_main.cpp中
```c++
//1466行左右
configure_stream_local("HIGHRES_IMU", unlimited_rate);
```
在`HIGHRES_IMU.hpp`中
```c++
// 增加头文件
#include <uORB/topics/vehicle_angular_velocity.h>
#include <uORB/topics/vehicle_acceleration.h>

//73行左右 send函数前 添加

uORB::Subscription _vehicle_acc_sub{ORB_ID(vehicle_acceleration)};
uORB::Subscription _vehicle_angular_vel_sub{ORB_ID(vehicle_angular_velocity)};
vehicle_acceleration_s vehicle_acc;
vehicle_angular_velocity_s vehicle_angular_vel;
bool vehicle_acc_updated = false, vehicle_angular_vel_updated = false;
uint64_t time_usec{0};
// #define original
#ifdef original

// 在205行左右};前添加
        #else //UAV fast IMU version
        bool send() override
        {

                //Check if accel and gyro are updated
                if (_vehicle_acc_sub.update(&vehicle_acc)) {
                        vehicle_acc_updated = true;
                        time_usec = vehicle_acc.timestamp_sample;
                }
                if (_vehicle_angular_vel_sub.update(&vehicle_angular_vel)) {
                        vehicle_angular_vel_updated = true;
                        time_usec = vehicle_angular_vel.timestamp_sample;
                }

                // if (vehicle_acc_updated && vehicle_angular_vel_updated) {
                if (vehicle_acc_updated&& vehicle_angular_vel_updated) {
                        vehicle_acc_updated = false;
                        vehicle_angular_vel_updated = false;
                        uint16_t fields_updated = 0;
                        fields_updated |= (1 << 0) | (1 << 1) | (1 << 2); // accel
                        fields_updated |= (1 << 3) | (1 << 4) | (1 << 5); // gyro
                        mavlink_highres_imu_t msg{};
                        msg.time_usec = time_usec;
                        msg.xacc = vehicle_acc.xyz[0];
                        msg.yacc = vehicle_acc.xyz[1];
                        msg.zacc = vehicle_acc.xyz[2];
                        msg.xgyro = vehicle_angular_vel.xyz[0];
                        msg.ygyro = vehicle_angular_vel.xyz[1];
                        msg.zgyro = vehicle_angular_vel.xyz[2];
                        msg.fields_updated = fields_updated;
                        mavlink_msg_highres_imu_send_struct(_mavlink->get_channel(), &msg);
                        return true;
                }
                return false;
        }
#endif
```



