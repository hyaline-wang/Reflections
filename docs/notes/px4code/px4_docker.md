---
title: px4_docker
createTime: 2024/09/09 13:24:35
permalink: /px4code/wno3ydw8/
---


## 下载源码

```bash
mkdir docker_px4 
cd docker_px4
git clone https://github.com/PX4/PX4-Autopilot.git 
```



构建docker container
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


```bash
 make px4_sitl_default gazebo-classic  
```


`Found Java: /usr/bin/java (found version "1.8.0_292") `
非常慢 3分钟左右



# 显示不出来

nvidia 显卡 

```
apt install -y libgl1-mesa-glx libgl1-mesa-dri
```


# 使用nvidia 显卡加速
使用 nvidia 显卡

```
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

