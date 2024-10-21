---
title: RTK 定位
createTime: 2024/09/09 16:41:53
permalink: /normal_hw/rtk/eiwjd104/
---


## RTK 配置规范

- Com1  Pixhawk  115200  GPGGA  GNRMC10hz
- Com2  Lora 数传 9600 10hz

> 定位 GPGGA 10hz 就够
# Px4 配置

```
GPS_1_CONFIG GPS2  (因为Pix6c上GPS2的的引脚数是8，对应RTK上的引脚位置和数量)
GPS_1_PROTOCOL NMEA
```

# px4 使用GPS

1. 使用默认固件
2. 重置参数
3. 配对遥控
4. 校准 Gyro Acc Compass
5. 通道5 模式 ，1 stab，4 atti 6 posi
6. 通道7 Arm
7. 通道8 kill
8. 