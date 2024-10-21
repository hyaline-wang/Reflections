---
title: 参数调试
createTime: 2024/10/20 20:17:25
permalink: /s26d5kdj/
---


## 参数表

<LinkCard title="1.13 参数表" href="https://docs.px4.io/v1.13/en/advanced_config/parameter_reference.html" description="" />
<LinkCard title="1.15 参数表" href="https://docs.px4.io/v1.15/en/advanced_config/parameter_reference.html" description="" />


## 重置参数

![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hyaline_kb/px4/image_20241021130452.png)

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
    - 插入串口
    - 修改参数查看是否有DISTANCE
    
    | 参数  | 开启 | 关闭 |
    |------|--------|-------|
    | SYS_HAS_MAG | 选择对应的口 | Disabled|
    

1. 禁用磁罗盘
    > 一些飞控没有罗盘，但是在选机架之后，EKF2_MAG_TYPE 会被重置，导致电机不转，你可以选择屏蔽罗盘
    ```
    SYS_HAS_MAG Disabled
    EKF2_MAG_TYPE None
    ```

@tab V1.15
1. 磁罗盘 开启|禁用
    > - 一些室内环境的磁场比较混乱，可以关闭磁罗盘
    > - 当使用GPS时磁罗盘必须开启 

    | 参数  | 开启 | 关闭 |
    |------|--------|-------|
    | SYS_HAS_MAG | Enable | Disabled|
    | EKF2_MAG_TYPE | Automatic | None|

1. 使用`Vision_pose`
    > 以使用VINS的数据作为`vision_pose`数据为例

    | 参数  | 开启 | 关闭 |
    |------|--------|-------|
    | EKF2_EV_CTRL | 11 | 0|
    | EKF2_EV_DELAY  | 50 ms     |         |
    | EKF2_EVP_NOISE  | 0.03     |         |
    | EKF2_EVP_GATE  | 25     |         |
    | EKF2_EVV_NOISE  | 0.03     |         |
    | EKF2_EVV_GATE  | 10     |         |


1. EKF 高度

    | 参数  | 开启 | 关闭 |
    |------|--------|-------|
    | EKF2_HGT_REF | Vision | |

1. EKF GPS 

    | 参数  | 开启 | 关闭 |
    |------|--------|-------|
    | EKF2_GPS_CTRL | 7 | 0 |

1. 气压计
    > 从1.14开始，EKF支持屏蔽掉气压计,紧凑型的小飞机往往会导致气压计不可用，通过监看数据确定桨转和气压机数据之间有没有关系即可确定气压计工作是否正常，正常的气压计精度在+-0.5m左右。

    | 参数  | 开启 | 关闭 |
    |------|--------|-------|
    | EKF2_BRAO_CTRL | Enable | Disabled|
:::


## 刷完默认固件后的操作


## 奇怪的参数
- COM_THROW_EN 允许通过将车辆扔到空中来启动车辆。