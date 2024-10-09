---
title: nomachine
createTime: 2024/09/09 13:22:12
permalink: /linux_base/4u4llyja/
---

## 性能占用

注意这样会增加CPU占用，在 i7-1145g 和 i5-1135g ，i5-1240p 中测试影响不大，但是在Xavier NX 中还是有一些影响(每一家的板子感觉性能时有一些区别的)

## 安装

一般来说使用远程软件时需要插着显示器或者一个显卡欺骗器，但是nomachine可以做到什么都不插。
```bash
sudo systemctl stop gdm
sudo /etc/NX/nxserver --restart
```
上面的方法需要每次开机输入，**你也可以直接用下面这行 一劳永逸解决问题**
```bash
systemctl set-default multi-user.target
# 然后
reboot
```
这样会有一些隐患，当你正常使用HDMI时，会发现没有图形界面了。
不过不用担心，若之后不用nomachine 了你可以使用
```bash
systemctl set-default graphical.target  
```
然后重启即可恢复要是之后还用，可以使用
```bash
systemctl isolate graphical.target
```
临时解决问题。




## 权限问题
打开使用nomachine远程时打开 设置 会一直提示你输密码，似乎wifi的周期性检测需要。还没有找到解决办法。但是可以通过sudo权限命令行打开设置来解决
```bash
sudo gnome-control-center
```