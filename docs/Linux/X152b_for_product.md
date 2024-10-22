---
title: X152b PC 生产初始化
createTime: 2024/10/22 20:34:59
permalink: /article/27023b50/
---


<!-- ## X152b PC 生产初始化 -->

:::info
- 供电：以下过程的供电，都以PD充电器供电为例，功率大于30w，华为的不能用
- 权限: 以下操作基本都需要root权限。
:::

:::: steps
1. 下载镜像
    1. 准备u盘，确保格式为exfat，若不是请格式化成exfat
    1. 下载镜像，并放到U盘中
2. 烧录固件。（USB 有线刷固件）

3. 使用pd充电器向供电口供电 
4. 连接usb至edge2 的OTG口 （现在X152b会自动获取ip，无需手动设置）
5. 重置主机名
    当第一次启动飞机后
    ```bash
    sudo python3 /opt/init_emnavi_device/01_rename_hostname.py --drone_type X152b --px4_sys_id 1
    ```
    :::info
    重新打开窗口后生效
    :::
6. 下载nomachine并安装
    ```bash
    curl -O http://110.42.45.189:18080/Nomachine/nomachine_8.6.1_3_arm64.deb  
    sudo dpkg -i nomachine_8.6.1_3_arm64.deb # 安装大约耗时1.5分钟，耐心等待
    rm nomachine_8.6.1_3_arm64.deb
    sudo systemctl set-default multi-user.target
    ```
7. 清除所有wifi连接
    ```bash
    sudo python3 /opt/init_emnavi_device/04_clean_wifi_connect.py
    ```
8. 设置wifi为wifi热点模式（5G AP模式）
    ```bash
    sudo python3 /opt/init_emnavi_device/05_reset_ap_mode.py
    ```
    :::info
    现在就可以通过`emNavi-XXXXXXXX_5G` 连接到机载PC了
    :::
9. 清除缓存
    ```bash
    sudo python3 /opt/init_emnavi_device/06_clean_cache.py
    ```
10. sync
    ```bash
    sync
    ```
11. pc断电
```

::::

## 连接至飞行器机载电脑

- Usb 虚拟网卡连接
- 连接至 X152b的热点
- 将X152b连接至路由器
- Hdmi + 键鼠

热点 和 STA 模式不兼容，切换推荐通过 USB有线

对于出厂固件，刚连接至飞行器时HDMI没有图形话界面，在连接了键鼠之后，
- emnavi
- 123456
登录电脑

现在输入 
sudo systemctl set-default graphical.target

sync



