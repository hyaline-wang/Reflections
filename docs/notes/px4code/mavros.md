---
title: mavros
createTime: 2024/09/09 14:52:19
permalink: /kxtk2ysd/
---

## 似乎 serviceClient 不能实例化两遍
# Quick Start





# gazebo 插件
## GPS (gazebo_gps_plugin.cpp)

首先 设置 
- PX4_HOME_LAT
- PX4_HOME_LON
- PX4_HOME_ALT





# Mavros 如何将数据传递给飞行器

## set_position_target_local_ned
对于mavlink 控制位置主要`set_position_target_local_ned`。



### px4 sitl with gazebo



 roslaunch mavros px4.launch gcs_url:="udp://:14550@10.42.0.200:14550"