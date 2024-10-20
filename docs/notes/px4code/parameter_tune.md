---
title: 参数调试
createTime: 2024/10/20 20:17:25
permalink: /s26d5kdj/
---


## 参数表

<LinkCard title="1.13 参数表" href="https://docs.px4.io/v1.13/en/advanced_config/parameter_reference.html" description="" />
<LinkCard title="1.15 参数表" href="https://docs.px4.io/v1.15/en/advanced_config/parameter_reference.html" description="" />

## 常用配置

::: tabs
@tab V1.13
1. 使用 RTK
    定高收敛慢

    > 切换目标高度时，飞行器高度震荡，发现local_pose没有很好的跟随GPS的z轴数据，

    ```
    EKF2_GPS_NOISE 0.5 -> 0.1
    ```
1. 使用TF mini
    - 插线
    - 修改 ->  SENS_TFMINI_CFG
    - 查看是否有DISTANCE

1. 禁用磁罗盘
    > 一些飞控没有罗盘，但是在选机架之后，EKF2_MAG_TYPE 会被重置，导致电机不转，你可以选择屏蔽罗盘
    ```
    SYS_HAS_MAG Disabled
    EKF2_MAG_TYPE None
    ```

@tab V1.15
1. 禁用磁罗盘
    ```
    SYS_HAS_MAG Disabled
    EKF2_MAG_TYPE None
    ```
1. 使用Vision_pose
    ```
    EKF2_EV_ENABLE
    EKF2_DELAY 50 
    ```
1. 气压计
    > 从1.14开始，EKF支持屏蔽掉气压计
    ```
    EKF2_BRAO_CTRL Disable
    ```
:::

## 奇怪的参数
- COM_THROW_EN 允许通过将车辆扔到空中来启动车辆。