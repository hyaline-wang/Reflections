---
title: qgc
createTime: 2024/09/09 14:53:08
permalink: /z8hnf86d/
---


# 配置依赖
```bash
sudo usermod -a -G dialout $USER
sudo apt-get remove modemmanager -y
sudo apt install gstreamer1.0-plugins-bad gstreamer1.0-libav gstreamer1.0-gl -y
sudo apt install libqt5gui5 -y
sudo apt install libfuse2 -y
```
## 下载

```bash
cd ~
wget http://home.qyswarm.top/data/ubuntu_Software_x64/QGroundControl.AppImage
chmod +x QGroundControl.AppImage
```


## 参数修改

对于 v1.13版本
```bash
SYS_HAS_MAG Disable
EKF2_MAG_TYPE NONE

EKF2_AID_MASK 1---->0  （1是使用GPS）

```


> 注意： EKF2_AID_MASK 从V1.14开始取消了，之后再修改


> 注意：调整过之后GPS是用不了的！！！！！！！！！