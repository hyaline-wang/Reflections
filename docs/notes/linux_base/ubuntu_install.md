---
title: ubuntu_install
createTime: 2024/09/09 17:22:25
permalink: /dol0a3iv/
---



# 1.系统安装

## 关闭SECURE BOOT


## 1.1.分区

1. EFI 分区 512M
2. SWAP 分区 内存大小两81倍
3. 主分区 剩下的

系统安装时间 约 2min，安装前务必断网

# 2.环境配置(ubuntu20.04)

```bash
# 换源(清华源)
sudo sed -i "s@<http://.*archive.ubuntu.com@https>://mirrors.tuna.tsinghua.edu.cn@g" /etc/apt/sources.list
sudo sed -i "s@<http://.*security.ubuntu.com@https>://mirrors.tuna.tsinghua.edu.cn@g" /etc/apt/sources.list

# 换源(中科大)
sudo sed -i 's@//.*archive.ubuntu.com@//mirrors.ustc.edu.cn@g' /etc/apt/sources.list

sudo apt update
# 安装必要的工具
sudo apt install -y net-tools openssh-server git vim curl terminator htop

# 安装ROS
sudo sh -c 'echo "deb <http://packages.ros.org/ros/ubuntu> $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'
curl -s <https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc> | sudo apt-key add -
sudo apt update $apt_proxy
sudo apt install -y ros-noetic-desktop-full $apt_proxy
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc

# 安装Realsense 驱动
# <https://github.com/IntelRealSense/librealsense/blob/master/doc/distribution_linux.md>
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-key F6E65AC044F831AC80A06380C8B3A55A6F3EFCDE || sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-key F6E65AC044F831AC80A06380C8B3A55A6F3EFCDE
sudo add-apt-repository "deb <https://librealsense.intel.com/Debian/apt-repo> $(lsb_release -cs) main" -u
sudo apt-get install -y librealsense2-dkms librealsense2-utils librealsense2-dev
librealsense2-dbg $apt_proxy

# ROS package 安装
sudo apt install -y ros-noetic-ddynamic-reconfigure ros-noetic-mavros ros-noetic-realsense2-camera $apt_proxy

cd /opt/ros/noetic/lib/mavros/
sudo vim ./install_geographiclib_datasets.sh
# 在第四行 添加
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
########
# save&quit

sudo ./install_geographiclib_datasets.sh

# 安装 ceres
sudo apt-get install -y libgoogle-glog-dev libgflags-dev
sudo apt-get install -y libatlas-base-dev
sudo apt-get install -y libeigen3-dev
sudo apt-get install -y libsuitesparse-dev
cd ~ && mkdir -p lib && cd lib
curl <http://ceres-solver.org/ceres-solver-2.1.0.tar.gz> -o cere-2.1.tar.gz
tar zxf cere-2.1.tar.gz
mkdir ceres-bin
cd ceres-bin
cmake ../ceres-solver-2.1.0
make -j3
sudo make install
```

# Compile ego_planner

```bash
mkdir -p ~/fast_ws/src && cd ~/fast_ws/src
git clone <https://github.com/ZJU-FAST-Lab/Fast-Drone-250.git>
cd ..

```

# Install USB WiFi driver.

## COMFAST CF-811AC

```bash
# 安装 dkms
sudo apt-get install dkms

git clone <https://github.com/brektrou/rtl8821CU.git>
cd rtl8821CU
sudo ./dkms-install.sh

```

# Q&A

## Why can't I see my wired Ethernet connection after installing Ubuntu 20.04?

Use the "`uname -r`" command to check your kernel version. Version 5.15 should work. You can use "`sudo apt upgrade`" to upgrade your kernel version.

# 对于NVIDIA NX

有可能无法按官方方法 编译，但其实只需要

```docker
cmake ..
make
sudo make install 
```

一条龙就可以了，不需要管其他的。草教程写那么多干嘛

# 双系统时间问题

对于ubuntu版本大于 16.04的版本，直接执行下面这行即可。windows可能需要重新同步一次时间。

`timedatectl set-local-rtc 1 --[adjust-system-clock](<https://www.zhihu.com/search?q=adjust-system-clock&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra=%7B%22sourceType%22%3A%22answer%22%2C%22sourceId%22%3A157272414%7D>)`