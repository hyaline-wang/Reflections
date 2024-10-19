---
title: ssh
createTime: 2024/10/19 16:28:19
permalink: /article/eaqdpyh5/
---

## ssh 的代理转发

服务器往往需要多人使用，在服务器上部署自己的代理服务似乎不太合适，当我们使用ssh时，可以尝试使用==ssh转发本地主机上的代理服务端口到服务器==上来取巧。

:::warning
代理通道占用ssh的带宽，假如ssh通过内网穿透实现的，那么效果受限于转发服务器的带宽，主流的国内服务器带宽一般低于5Mbps，效果可能不佳。
:::


```bash {5-6}
Host 雨云server
    HostName 110.42.45.189
    User root 
    IdentityFile "C:\Users\hao\.ssh\id_rsa"
    RemoteForward 9001 localhost:7890  # 将本地clash端口(7890)转发至服务器9001端口
    SetEnv http_proxy=http://localhost:9001 https_proxy=http://localhost:9001 
```