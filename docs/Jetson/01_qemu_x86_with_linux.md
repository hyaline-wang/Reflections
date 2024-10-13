---
title: 01_qemu_x86_with_linux
createTime: 2024/10/10 07:31:15
permalink: /article/m13iic48/
---

## 一个完整的Linux 系统的构成

对于在qemu中运行的系统，必要组件为
- Linux Kernel
- rootfs

对于一个arm芯片上运行的linux操作系统，其包含以下3个部分
- u-boot
- rootfs
- kernel

initrd 加载一个临时的根文件系统到 memory中
有两种不同的实现方法。
- initrd
      - 第一个进程: /linuxrc，执行结束后认为真实的文件系统的以及被挂载，接着执行/sbin/init开始正常用户空间的boot 进程。
- initramfs
      - 从 linux kernel 2.6.13开始可用

ubuntu_base 就是一个rootfs，一个全量版的大小为5


## 系统启动流程

1. 加载内核 ，存储的时候是被压缩的状态吗？
2. /sbin/init
     1. 这是一个非内核进程，PID总是1
     2. /etc/inittab
     3. /etc/rc.d/rc.sysinit
3. 从 /etc/modules.conf 或者 /etc/modules.d 目录下 装载内核模块
4. 

:::caution
文件系统到底提供了什么功能
:::

## 构建第一个linux镜像

:::info 
本节中生成的镜像包含两个部分
- 
-
:::


### 安装QEMU x86

```
sudo apt install build-essential git kconfig-frontends flex bison libelf-dev bc libssl-dev qemu qemu-system-x86
```

### 下载linux和busybox

:::info
本节构建的系统均在 `~/kdev` 文件夹下完成
:::


```bash
cd $HOME
mkdir kdev 

# compile busybox   ->  cpio
cd ~/kdev
wget http://busybox.net/downloads/busybox-1.36.1.tar.bz2
tar -xvf busybox-1.36.1.tar.bz2
cd busybox-1.36.1
make O=$HOME/kdev/busybox-1.36.1/build/busybox-x86 defconfig
make O=$HOME/kdev/busybox-1.36.1/build/busybox-x86 menuconfig
# Setting -->
#    -- Build Options
#    勾选 Build static library (no shared libs)
cd build/busybox-x86
make -j8 
make install

# 构建 cpio.gz

mkdir -p $HOME/kdev/busybox-1.36.1/build/initramfs/busybox-x86
cd $HOME/kdev/busybox-1.36.1/build/initramfs/busybox-x86

mkdir -pv {bin,sbin,etc,proc,sys,usr/{bin,sbin}}
cp -av ../../busybox-x86/_install/* .
## 创建 init
touch init
vim init
## 构建压缩过的initramfs-busybox-x86.cpio.gz
find . -print0 | cpio --null -ov --format=newc | gzip -9 > ../initramfs-busybox-x86.cpio.gz

# compile linux
git clone https://github.com/torvalds/linux.git
cd linux
mkdir build/linux-x86-basic
make O=/home/hao/kdev/linux/build/linux-x86-basic/ x86_64_defconfig
make O=/home/hao/kdev/linux/build/linux-x86-basic/ kvm_guest.config

cd build/linux-x86-basic
make -j8 #大约5分钟

# 启动 qemu

qemu-system-x86_64 \
-kernel $HOME/kdev/linux/build/linux-x86-basic/arch/x86_64/boot/bzImage \
-initrd $HOME/kdev/busybox-1.36.1/build/initramfs/initramfs-busybox-x86.cpio.gz \
-nographic -append "console=ttyS0" \
-enable-kvm
```


什么是KVM, 虚拟机


对于busybox 1.24.2 ， 在 ubuntu22.04上编译报没有rpc/rpc.h， 1.36.1没有这个问题

```bash
networking/inetd.c:178:11: fatal error: rpc/rpc.h: No such file or directory
          32 | #include <rpc/rpc.h>
```


https://gist.github.com/ncmiller/d61348b27cb17debd2a6c20966409e86

https://developer.nvidia.com/embedded/jetpack

https://www.cnblogs.com/lvzh/p/14907592.html

https://www.cnblogs.com/bruce1992/p/17670128.html



