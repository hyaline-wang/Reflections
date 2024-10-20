---
title: 构建px4 docker环境
createTime: 2024/09/09 13:24:35
permalink: /px4code/wno3ydw8/
---

<!-- # 构建px4 docker环境 -->
> 开始前，请确保已经安装了docker

主机环境
- ubuntu 20.04  5.15.0-117-generic

此章节有3个作用
1. 构建基于docker的px4的编译环境
2. 构建docker下 `gazebo + ros`的仿真环境
3. 构建docker下 `gazebo` + 主机 `ros`的联合仿真环境

## 下载源码
```bash
mkdir docker_px4 
cd docker_px4
# 国内下载大概率
git clone https://github.com/PX4/PX4-Autopilot.git  --recursive
```



## 构建docker container

启动docker容器的命令添加了很多参数，是为了在能够正常显示gazebo

```
# enable access to xhost from the container
xhost +

# Run docker and open bash shell
docker run -it --privileged \
--env=LOCAL_USER_ID="$(id -u)" \
-v $(pwd)/PX4-Autopilot:/PX4-Autopilot/:rw \
-v /tmp/.X11-unix:/tmp/.X11-unix:ro \
-e DISPLAY=:0 \
--network host \
--name=px4-ros px4io/px4-dev-ros-noetic:2022-07-31 bash
```
## 启动gazebo仿真


```bash
 make px4_sitl_default gazebo-classic  
```


`Found Java: /usr/bin/java (found version "1.8.0_292") `
非常慢 3分钟左右



## 显示问题修复

> gazebo 显示不出来


当发现gazebo帧率过低时，证明是使用cpu渲染，可通过以下步骤使用Nvidia Gpu。

```bash
apt install -y libgl1-mesa-glx libgl1-mesa-dri
```
启动镜像的命令做如下修改

## 使用nvidia 显卡加速
使用 nvidia 显卡

```bash
# enable access to xhost from the container
xhost +

# Run docker and open bash shell
docker run -it --privileged \
--env=LOCAL_USER_ID="$(id -u)" \
-v $(pwd)/PX4-Autopilot:/PX4-Autopilot/:rw \
-v /tmp/.X11-unix:/tmp/.X11-unix:ro \
-e DISPLAY=:1 \
--gpus all \
--runtime=nvidia \
--env="QT_X11_NO_MITSHM=1" \
-e NVIDIA_DRIVER_CAPABILITIES=all \
--network host \
--name=px4-ros-gpu px4io/px4-dev-ros-noetic:2022-07-31 bash
```