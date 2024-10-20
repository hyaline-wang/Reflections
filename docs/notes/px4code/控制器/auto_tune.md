---
title: 参数自优化
createTime: 2024/10/20 14:11:31
permalink: /px4code/controller/4dbuxj2w/
---

## PID Fine Tune

:::: steps
1. Mavlink收到消息
    在 `src/modules/mavlink/mavlink_receiver.cpp`中 ，当收到
    MAV_CMD_DO_AUTOTUNE_ENABLE消息时。
    - 判断飞机类型 ，若是旋翼，设置MC_AT_START==True
    - 进度记录，根据不同的指令，显示不同的进度
    `McAutotuneAttitudeControl` 工作
2. state::idle
    在检测到MC_AT_START==True时，进入state::init
3. state::init
    初始化参数
4. state::roll

::::


## SystemIdentification

`src/lib/system_identification/arx_rls.hpp`


Px4 参数自优化
Px4 任务调度

除了 实例化后的

startTask -> threadEntryTrampoline -> 
threadEntry -> 
Gyro Calibration

INTERVAL = 20ms



FFT

参数中有一个 _param_imu_gyro_fft_len，有三个预设长度
- 256
- 512
- 1024
其他被设置为256

2Hz 更新频率、
