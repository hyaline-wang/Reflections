---
title: X152b PC 生产初始化
createTime: 2024/10/22 20:34:59
permalink: /article/27023b50/
---

## X152b PC 生产初始化

:::warning
大致步骤为
- 烧录固件
- 进入PC，手动进行初始化设置
:::

:::info
- 供电：以下过程的供电，都以PD充电器供电为例，功率大于30w，华为的不能用
- 权限: 以下操作大部分需要root权限。
:::

:::: steps
1. 下载镜像
    <LinkCard title="镜像下载" href="https://pan.baidu.com/s/1gCpzRgslIaQBB8V8f3iHUQ?pwd=5ugn" description="百度云密码: 5ugn" />
    1. 准备u盘，确保格式为exfat，若不是请格式化成exfat
    1. 下载镜像，并放到U盘中
2. 烧录固件。（Write）
    <LinkCard title="USB 有线刷固件" href="/article/1zbyaj5c/#dump-%E4%B8%8E-write" description="请看Write" />

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
11. pc断电，结束
::::
