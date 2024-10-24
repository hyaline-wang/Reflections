---
title: X152b_connect
createTime: 2024/10/23 20:04:31
permalink: /article/zfxyfnb2/
---

## 连接至飞行器机载电脑

:::info
默认账户密码为
|Account|Password|
|-------|--------|
|emnavi |123456  |
:::

有四种方法可以连接到飞行器pc
- USB 虚拟网卡连接
- 连接至 X152b的热点（AP）
- 将X152b连接至路由器 (STA)
- Hdmi + 键鼠

热点 和 STA 模式不兼容，切换推荐通过 USB有线

### USB 连接

:::info
USB OTG模式会在连接过其他设备后自动退出
:::

通过usb连接到主机(连接后主机会自动获取ip)，飞行器ip地址为 `192.168.108.1`,你可以通过ssh连接至设备
```bash
ssh emnavi@192.168.108.1
```
除了ssh登录外，你还可以使用Nomachine登录

### AP模式

X152b设备被设计为出厂设置为AP模式，你可以通过连接至 `emNavi-XXXXXXXXX-5G`访问设备，飞行器ip为 **192.168.109.1**

```bash
ssh emnavi@192.168.109.1
```

除了ssh登录外，你还可以使用Nomachine登录


### STA 模式

在**除AP模式之外**的其他连接模式中通过以下方式连接至其他wifi
```bash
sudo python3 /opt/init_emnavi_device/04_clean_wifi_connect.py # 清除所有wifi连接，包括关闭ap模式
sudo nmcli device wifi list # 列出所有的搜索到的wifi
sudo nmcli device wifi connect <wifi_name>  password <wifi_password>
```
- <wifi_name> ： wifi名
- <wifi_password>: wifi密码

除了ssh登录外，你还可以使用Nomachine登录

### Hdmi + 键鼠

:::info
出厂状态下，连接HDMI并不会直接进入到图形化界面，这是这是为了Nomachine能够正常工作。为了图形化界面正常工作，你可以进行如下操作。
```bash
# 在连接了键鼠之后，使用emnavi账户登录，密码123456
sudo systemctl set-default graphical.target
sudo reboot #重启设备
```
重启完成后应该正常显示图形化界面
:::


