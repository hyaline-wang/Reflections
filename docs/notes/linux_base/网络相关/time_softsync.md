---
title: 时间同步
createTime: 2024/09/07 01:10:29
permalink: /linux_base/network/en2aru8t/
---

# 时间同步
## NTP时间同步
电脑中默认的时间同步方式一般为NTP,精度一般是10ms左右。


## 局域网时间同步

而PTP同步精可达亚微妙级

与NTP一样，PTP也是 Server/Client 架构，对于 ubuntu
### Install

```
sudo apt install ptpd
```
### 配置

**Server**

```bash
# eth0 是网口名，根据实际情况选择
sudo ptpd -M -i eth0
```
**Client**
```bash
# 同样 eno1 也是网口名，根据实际情况选择
sudo ptpd -g -i eno1 -C
```



# 长期使用 (systemd)