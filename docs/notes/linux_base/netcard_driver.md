---
title: netcard_driver
createTime: 2024/09/07 01:11:19
permalink: /article/zkt7lipg/
---

## 网卡驱动修复
低版本内核对于新硬件不太支持，通过下面命令可以将内核升级到5.15，重启之后生效。
```
sudo apt upgrade
# 使用下面命令重启
reboot
```


### COMFAST CF-811AC
```bash
# 安装 dkms
sudo apt-get install dkms
mkdir -p ~/install && cd ~/install 
git clone https://github.com/brektrou/rtl8821CU.git
cd rtl8821CU
sudo ./dkms-install.sh
# 验证
dkms status |grep rtl8821CU
# 若 看到含有红色的rtl8821CU字样，则成功
```

## 连接wifi

```bash
# 更新wifi 列表
sudo nmcli device wifi list
# 更新后按q退出
# 连接到 Drones_5G
sudo nmcli device wifi connect Drones_5G password 123456789
# 成功后拔掉网线
clash_ok
# 返回 连接正常，则之后不再需要网线了。

# 可以重复执行
```
ifconfig 可以查看所有ip,找到 wifi的 ip,贴到电脑上