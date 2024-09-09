---
title: ctrl_freq
createTime: 2024/09/09 17:26:41
permalink: /pwlltgw1/
---


Px4 文档提供了[Multicopter Control Architecture](https://docs.px4.io/main/en/flight_stack/controller_diagrams.html#multicopter-control-architecture)

但是实际速度不太能对的上

PX4 上的应用程序拥有[两种模式](https://docs.px4.io/main/en/concept/architecture.html#runtime-environment)
- Task 
- work queue Task
	- 通过指定**未来的固定时间**或通过 uORB 主题**更新回调**来安排工作队列任务。一般在init 中设置
控制器的实现均依靠 work queue Task，因此其频率orb msg 的频率是相关的，Px4提供了[`uorb top -1`](https://docs.px4.io/main/en/middleware/uorb.html)的命令监控消息频率。

# orb 频率监控
以下是 6c 和 nxtpx4 的实测数据
> px4 提供了 [uORB Publication/Subscription Graph](https://docs.px4.io/main/en/middleware/uorb_graph.html#uorb-publication-subscription-graph) ，但是太乱了


FMU v6  V1. 13.1 和 V1.13.2 （两个版本数据接近）

nsh> uorb top -1  
  
update: 1s, topics: 122, total publications: 15685, 1472.2 kB/s  
TOPIC NAME                      INST #SUB RATE #Q SIZE  
actuator_armed                     0   13    2  1   16   
actuator_controls_0                0   10  663  1   48   
actuator_outputs                   2    1  400  1   80   
adc_report                         0    1  100  1   96   
battery_status                     0    7  100  1  168   
commander_state                    0    1    2  1   16   
cpuload                            0    4    2  1   16   
ekf2_timestamps                    0    1  221  1   24   
estimator_attitude                 0    2  221  1   56   
estimator_attitude                 1    1  203  1   56   
estimator_event_flags              0    1    1  1   56   
estimator_event_flags              1    1    1  1   56   
estimator_innovation_test_ratios   0    1  110  1  136   
estimator_innovation_test_ratios   1    1  101  1  136   
estimator_innovation_variances     0    1  110  1  136   
estimator_innovation_variances     1    1  101  1  136   
estimator_innovations              0    1  110  1  136   
estimator_innovations              1    1  101  1  136   
estimator_local_position           0    2  110  1  168   
estimator_local_position           1    1  101  1  168   
estimator_odometry                 0    1  110  1  256   
estimator_selector_status          0    7    1  1  160   
estimator_sensor_bias              0    4    1  1  120   
estimator_sensor_bias              1    1    1  1  120   
estimator_states                   0    1  110  1  216   
estimator_states                   1    1  101  1  216   
estimator_status                   0    5  110  1  112   
estimator_status                   1    2  101  1  112   
estimator_status_flags             0    2    1  1   96   
estimator_status_flags             1    1    1  1   96   
failure_detector_status            0    1    2  1   24   
magnetometer_bias_estimate         0    2   46  1   64   
px4io_status                       0    1    1  1  144   
rate_ctrl_status                   0    1  663  1   24   
rtl_time_estimate                  0    2    1  1   24   
safety                             0    2    1  1   16   
sensor_accel                       0    5  664  8   48   
sensor_accel                       1    4  812  8   48   
sensor_baro                        0    2   69  4   32   
sensor_combined                    0    3  221  1   48   
sensor_gyro                        0    6  665  8   48   
sensor_gyro                        1    4  812  8   48   
sensor_gyro_fifo                   0    2  665  4  224   
sensor_mag                         0    5   46  4   40   
sensors_status_imu                 0    2  221  1   96   
system_power                       0    2  100  1   40   
telemetry_status                   0    2    2  1   88   
telemetry_status                   1    1    1  1   88   
vehicle_acceleration               0    2  221  1   32   
vehicle_air_data                   0   11   19  1   40   
vehicle_angular_acceleration       0    2  663  1   32   
vehicle_angular_velocity           0    9  663  1   32   
vehicle_attitude                   0    9  221  1   56   
vehicle_attitude_setpoint          0    4  221  1   64   
vehicle_control_mode               0   16    2  1   24   
vehicle_imu                        0    5  221  1   56   
vehicle_imu                        1    5  203  1   56   
vehicle_imu_status                 0    8   10  1  120   
vehicle_imu_status                 1    5    9  1  120   
vehicle_land_detected              0   14    1  1   24   
vehicle_local_position             0   24  110  1  168   
vehicle_magnetometer               0    4   13  1   40   
vehicle_odometry                   0    1  110  1  256   
vehicle_rates_setpoint             0    4  221  1   32   
vehicle_status                     0   28    2  1   88   
vehicle_status_flags               0    5    2  1   48

---------
Nxtpx4  V1.13.2 

update: 1s, topics: 89, total publications: 27719, 2088.0 kB/s  
TOPIC NAME                      INST #SUB RATE #Q SIZE  
actuator_armed                     0    9    2  1   16   
actuator_controls_0                0    9 2000  1   48   
actuator_outputs                   0    3 2000  1   80   
adc_report                         0    2  100  1   96   
battery_status                     0    7  100  1  168   
commander_state                    0    1    2  1   16   
control_allocator_status           0    2 2000  1   80   
cpuload                            0    4    2  1   16   
ekf2_timestamps                    0    1  173  1   24   
estimator_attitude                 0    2  173  1   56   
estimator_event_flags              0    1    1  1   56   
estimator_innovation_test_ratios   0    1   86  1  136   
estimator_innovation_variances     0    1   86  1  136   
estimator_innovations              0    1   86  1  136   
estimator_local_position           0    2   86  1  168   
estimator_odometry                 0    1   86  1  256   
estimator_selector_status          0    6    1  1  160   
estimator_sensor_bias              0    4    1  1  120   
estimator_states                   0    1   86  1  216   
estimator_status                   0    5   86  1  112   
estimator_status_flags             0    2    1  1   96   
estimator_visual_odometry_aligned  0    1  154  1  256   
failure_detector_status            0    1    2  1   24   
rate_ctrl_status                   0    1 2000  1   24   
rtl_time_estimate                  0    2    1  1   24   
safety                             0    2    1  1   16   
sensor_accel                       0    5 1600  8   48   
sensor_baro                        0    2   23  4   32   
sensor_combined                    0    2  173  1   48   
sensor_gyro                        0    6 2000  8   48   
sensor_gyro_fifo                   0    2 2000  4  224   
sensors_status_imu                 0    2  173  1   96   
system_power                       0    2  100  1   40   
telemetry_status                   0    2    1  1   88   
telemetry_status                   1    1    2  1   88   
vehicle_acceleration               0    3 1600  1   32   
vehicle_air_data                   0   10   15  1   40   
vehicle_angular_acceleration       0    2 2000  1   32   
vehicle_angular_velocity           0   10 2000  1   32   
vehicle_attitude                   0    9  173  1   56   
vehicle_attitude_setpoint          0    4  173  1   64   
vehicle_control_mode               0   14    2  1   24   
vehicle_imu                        0    4  173  1   56   
vehicle_imu_status                 0    8    9  1  120   
vehicle_land_detected              0   13    1  1   24   
vehicle_local_position             0   24   86  1  168   
vehicle_odometry                   0    1   86  1  256   
vehicle_rates_setpoint             0    4  173  1   32   
vehicle_status                     0   27    2  1   88   
vehicle_status_flags               0    5    2  1   48   
vehicle_visual_odometry            0    2  200  1  256


# 控制频率图
根据以上数据,得到实际的控制频率如下图




![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hao_doc/Pasted%20image%2020240724170815.png)

![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hao_doc/Pasted%20image%2020240724170834.png)




观察上图 ，ORB_ID(vehicle_attitude_setpoint) 两倍于输入频率

> 以下以 Nxtpx4 V1.13.2 为例
# ORB_ID(vehicle_attitude_setpoint)
对于 四旋翼 PUB 来自三个程序
## MulticopterPositionControl
\_vehicle_attitude_setpoint_pub
与以下两个因素相关
- \_vehicle_control_mode.flag_multicopter_position_control_enabled
- ORB_ID(vehicle_local_position)
## MulticopterAttitudeControl
与以下两个因素相关
- \_v_control_mode.flag_control_attitude_enabled && (is_hovering || is_tailsitter_transition)
- ORB_ID(vehicle_attitude)

注意: vehicle attitude 的频率是 221 hz

# MavlinkReceiver
mavlink 直接控制姿态

使用 **Nxtpx4** 重新测试： 将 飞机切换为 POSITION 模式后 ，ORB_ID(vehicle_attitude_setpoint) 频率变为 87 hz。
# 工作队列频率

最后通过 `work_queue status` 可以看到(Nxtxp4)工作队列的频率

```bash
nsh> work_queue status  
  
Work Queue: 8  threads                          RATE        INTERVAL  
|__ 1) wq:rate_ctrl      
|   |__ 1) mc_rate_control                 2000.6 Hz          500 us  
|   |__ 2) pwm_out0                        1997.3 Hz          501 us  
|   \__ 3) vehicle_angular_velocity        2000.6 Hz          500 us  
|__ 2) wq:SPI3           
|   |__ 1) bmi088_accel                    1606.2 Hz          623 us  
|   \__ 2) bmi088_gyro                     2000.5 Hz          500 us  
|__ 3) wq:I2C1           
|   \__ 1) bmp388                            23.1 Hz        43299 us (43300 us)  
|__ 4) wq:nav_and_controllers  
|   |__ 1) ekf2_selector                    258.8 Hz         3863 us  
|   |__ 2) flight_mode_manager               50.0 Hz        19998 us  
|   |__ 3) land_detector                     86.4 Hz        11579 us  
|   |__ 4) mc_att_control                   173.1 Hz         5776 us  
|   |__ 5) mc_hover_thrust_estimator         86.6 Hz        11552 us  
|   |__ 6) mc_pos_control                    86.3 Hz        11584 us  
|   |__ 7) sensors                          173.1 Hz         5776 us  
|   |__ 8) vehicle_acceleration            1606.3 Hz          623 us  
|   |__ 9) vehicle_air_data                  23.1 Hz        43307 us  
|   \__10) vehicle_gps_position               3.3 Hz       299993 us  
|__ 5) wq:INS0           
|   |__ 1) ekf2                             173.1 Hz         5776 us  
|   \__ 2) vehicle_imu                      519.4 H                 100.0 Hz        10000 us  
|   |__ 2) board_adc                        100.0 Hz        10000 us (10000 us)  
|   |__ 3) gyro_totune_attitude_control       0.0 Hz            0 us  
|   |__ 6) rc_update                        142.9 Hz         7000 us  
|   \__ 7) tone_alarm                         0.1 Hz     15154584 us  
|__ 7) wq:ttyS4          
|   \__ 1) rc_input                         250.0 Hz         4000 us (4000 us)  
\__ 8) wq:lp_default     
    |__ 1) gyro_calibration                  48.8 Hz        20479 us (20000 us)  
    |__ 2) load_mon                           2.0 Hz       499799 us (500000 us)  
    |__ 3) mag_bias_estimator                49.9 Hz        20041 us (20000 us)  
    \__ 4) send_event                        30.0 Hz        33333 us (33333 us)
```

与orb数据可以对的上
|   |__ 1) mc_rate_control                 2000.6 Hz          500 us  
|   |__ 6) mc_pos_control                    86.3 Hz        11584 us  
|   |__ 4) mc_att_control                   173.1 Hz         5776 us