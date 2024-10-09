---
title: opencv-install
createTime: 2024/10/10 04:32:54
permalink: /article/4r1kwxab/
tags:
    - 源码安装
    - linux
---

# opencv 安装

## 多版本Opencv 

:::warning
以3.4.18为例，比较老，是ubuntu18时用的
:::

```bash
wget https://codeload.github.com/opencv/opencv/zip/refs/tags/3.4.18 -O opencv3-4-18.zip
unzip opencv3-4-18.zip
cd opencv-3.4.18/
mkdir build && cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE \
        -D CMAKE_INSTALL_PREFIX=/usr/local \
        -D WITH_CUDA=ON \
        -D CUDA_ARCH_BIN=7.2 \
        -D CUDA_ARCH_PTX="" \
        -D ENABLE_FAST_MATH=ON \
        -D CUDA_FAST_MATH=ON \
        -D WITH_CUBLAS=ON \
        -D WITH_LIBV4L=ON \
        -D WITH_GSTREAMER=ON \
        -D WITH_GSTREAMER_0_10=OFF \
        -D WITH_QT=ON \
        -D WITH_OPENGL=ON \
        -D CUDA_NVCC_FLAGS="--expt-relaxed-constexpr" \
        -D WITH_TBB=ON  ..
make -j6   
sudo make install

```

## 编译With Cuda
动机：ROS自带的opencv不包含CUDA加速，要使用cuda加速只能选择自行编译。不过opencv的GPU 加速对 cuda 版本有限制

### 版本对应


## 多版本 cv_bridge

```bash
mkdir cv_bridge_ws &&cd cv_bridge_ws
mkdir src && cd src
# ubuntu18是melodic，ubuntu20是 noetic，根据情况替换
wget https://github.com/ros-perception/vision_opencv/archive/refs/heads/melodic.zip
unzip melodic.zip
cd vision_opencv-melodic/

# 设置所有CMakeLists.txt 的 OpenCV_DIR,使其链接到对应的版本，比如
# set(OpenCV_DIR /usr/local/share/OpenCV)
# 对于自行编译的版本
# set("OpenCV_DIR" "/home/hao/Lib_Install/opencv-3.4.3/build")

# 最后 catkin_make
```


# 多版本使用
```bash
# 为了不安装使用，你需要手动在需要编译的project中设置
set(OpenCV_DIR /usr/local/share/OpenCV)
set(cv_bridge_DIR /home/nvidia/cv_bridge_ws/devel/share/cv_bridge/cmake)
```

