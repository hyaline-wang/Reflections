---
title: Magic
createTime: 2024/09/09 17:35:29
permalink: /linux_base/network/07z7jyko/
---
<!-- # 代理（proxy）的介绍 -->

由于总所周知的网络问题，做任何编程开发前最好要先了解一些网络知识。而一定不能错过的关键词是`代理`。

## 什么是代理



## 代理怎么用

代理软件总是 将服务映射到某个端口(0~65535)，由于大部分时候软件直接在本地部署，所以服务地址为127.0.0.1:端口号。

以下将从两个方面介绍代理在ubuntu下的使用。
- 有图形化界面的程序
- 命令行程序

> 这里不介绍windows下的使用。以下以 clash最常用的设置 `127.0.0.1:7890` 为例

### 有图形化界面的程序

对于有图形化界面的程序，大多会自动读取设置下的代理配置并使用

### 命令行程序

程序读取环境变量，http_proxy 和 https_proxy 来设置代理，你可以通过以下命令查看当前的代理设置

```bash
echo $http_proxy
echo $https_proxy
```

在没有设置时输出应均为空。你可以通过设置这两个变量以使用代理，例如
```bash
# 常见的设置代理环境变量
export http_proxy=http://127.0.0.1:7890
export https_proxy=http://127.0.0.1:7890
# 补充，一般用不上
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
```

以上是通用方法，在大部分情况下都有用，如果想
一劳永逸。
```bash
# 如果你只需要普通用户下有用，你需要设置
 echo -e "export http_proxy=127.0.0.1:7890\nexport https_proxy=127.0.0.1:7890" >> ~/.bashrc
# 如果你需要所有用户下都有用，你需要设置
 echo -e "export http_proxy=127.0.0.1:7890\nexport https_proxy=127.0.0.1:7890" >> /etc/bash.bashrc
```


环境变量是有作用域的，例如:
- 当你执行脚本 `./test.sh`时，在环境外设置的`http_proxy`和`https_proxy`不会传递到`test.sh`中。-
- `sudo`是独立的环境变量，所以仅设置`http_proxy`和`https_proxy`，在`apt update`和`apt install xxxx`时，如果需要访问国外网址，还是会非常慢，因为不走代理。
- python 中下文件时如果遇到国外网站并且被墙，也会非常慢。

为了解决以上问题，解决方案如下
1. `source ./test.sh` 会使用设置的`http_proxy`和`https_proxy`，或者修改脚本，在脚本中添加代理环境变量。
2. 先通过`sudo su `切换到`root`下，在设置代理环境变量，再执行`apt update` 或 `apt install xxxx`
3. google `如何在 XXXX时使用代理`

## docker下使用

分两种情况 
1. 从dockerhub pull 镜像时 使用代理
2. 使用容器时 使用代理

### pull 镜像时使用

[Docker的三种网络代理配置 · 零壹軒·笔记](https://note.qidong.name/2020/05/docker-proxy/)

在执行`docker pull`时，实际是由守护进程dockerd来执行。 因此，代理需要配在dockerd的环境中。 而这个环境，则是受systemd所管控，因此需要修改systemd的配置。

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo touch /etc/systemd/system/docker.service.d/proxy.conf
sudo vim /etc/systemd/system/docker.service.d/proxy.conf
```

在这个proxy.conf文件（可以是任意*.conf的形式）中，添加以下内容：
```bash
[Service]
Environment="HTTP_PROXY=http://127.0.0.1:7890/"
Environment="HTTPS_PROXY=http://127.0.0.1:7890/"
```
最后,重启服务
```bash
systemctl daemon-reload
systemctl restart docker
```
现在使用`docker pull`时便走代理了。

### 在docker内使用

可以通过走主机上的代理服务实现，正常情况下，在docker中主机IP为 172.17.0.1, 因此可用以下方法设置。

```bash
export http_proxy=http://172.17.0.1:7890
export https_proxy=http://172.17.0.1:7890
```


## github ssh
~/.ssh/config中 添加
```
Host github.com
    User git
    Port 443
    HostName ssh.github.com
    IdentityFile ~/.ssh/id_rsa
    ProxyCommand nc -v -x 127.0.0.1:7890 %h %p
```


### 常用软件设置代理

 - Pnpm 使用代理


# windows cmd 设置代理
临时使用

```bash
set HTTP_PROXY=http://127.0.0.1:7890
set HTTPS_PROXY=https://127.0.0.1:7890
```
# clash

增加代理规则示例
```
- DOMAIN-SUFFIX,mycustom.top,DIRECT
- DOMAIN-SUFFIX,openai.com,GPT
- DOMAIN-SUFFIX,auth0.com,GPT
- DOMAIN-SUFFIX,bing.com,GPT
- DOMAIN-SUFFIX,live.com,GPT
```