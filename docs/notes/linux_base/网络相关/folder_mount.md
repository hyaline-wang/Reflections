---
title: 网络文件夹挂载
createTime: 2024/09/09 11:30:55
permalink: /linux_base/network/1q4jvc56/
---

# folder_mount

## semba(SMB)

:::caution
测试出现了很多权限的问题

- Windows 下无法修改 linux 下创建的文件
- linux下 无法修改 Windows 下创建的文件

因此弃用了
:::





## webdav 的使用

### server 配置

:::info
环境: ubuntu 20.04
:::

**1.安装apache2**
```bash
sudo apt update
sudo apt install apache2

# 启用 WebDAV 模块
sudo a2enmod dav 
sudo a2enmod dav_fs
```

**2.创建 WebDAV 目录**

创建一个用于存储 WebDAV 文件的目录。你可以选择在任何地方创建此目录，例如 `/var/www/webdav`。确保该目录具有适当的权限以允许 Apache 读写，可以使用以下命令：

```bash
sudo mkdir /var/www/webdav 
sudo chown www-data:www-data /var/www/webdav
```


**3.配置 WebDAV**

编辑 Apache 配置文件以配置 WebDAV。创建一个新的配置文件或编辑默认配置文件(`/etc/apache2/sites-available/000-default.conf`)。添加以下配置块：

```xml
Alias /webdav /var/www/webdav  

<Directory /var/www/webdav>     
	DAV On     
	AuthType Basic     
	AuthName "WebDAV Authentication"     
	AuthUserFile /etc/apache2/webdav.passwd     
	equire valid-user 
</Directory>`
```

这个配置将 WebDAV 映射到 URL 路径 `/webdav`，并配置了基本身份验证。它还指定了 WebDAV 用户的密码文件路径为 `/etc/apache2/webdav.passwd`，你可以将其替换为自己选择的路径。

**4.创建 WebDAV 用户**

创建一个 WebDAV 用户，并设置密码。使用以下命令：

`sudo htpasswd -c /etc/apache2/webdav.passwd your_username`

替换 `your_username` 为你选择的用户名。

**5.重启 Apache**

重启 Apache 以使配置更改生效：

`sudo systemctl restart apache2 `


## client 配置

### windows

对于Windows，其默认不接受  https 的 webdev ， 因此需要修改注册表,或者你可以使用，修改后可以挂载。
如果不想修改注册表可以使用，[RaiDrive](https://www.raidrive.com/),可以参考此[教程](https://www.expoli.tech/articles/2020/12/30/1609327097930)。

### obsidian
对于 obsidian 推荐 ==Remotely save== 这个插件
:::warning
 remotely save 插件，需要手动同步，一个人使用问题不大，多人使用还是不太好用，有时候会感觉少了东西。
 
 在linux下，你可以通过挂载实现自动同步
```bash
# 查看当前用户uid，uid (user identifier) and gid (group identifier)
id -u #uid

sudo mount -t davfsv -o umask=0066,gid=1000,uid=1000  http://10.42.0.180/webdav/new_obsdata ob_date/
### 取消挂载
sudo umount ob_date 
```
但是最好不要出现多个人同时操作
:::

### linux
对于linux，推荐使用 mount  挂载
:::info
以 ubuntu 20.04 为例，参考了此[教程](https://xiaolee.xyz/archives/ubuntu2004%E6%8C%82%E8%BD%BDwebdav)。
:::
```bash
sudo apt update 
sudo apt install davfs2

sudo mkdir 要挂载的文件夹

sudo mount -t davfs http://example.com/webdav 要挂载的文件夹
# eg 1.进入apache 挂载目录
# 2. sudo mkdir share
# 3. sudo mount -t davfs http://10.42.0.180/webdav/Share_data/ share/

# 更改权限否则不好改
sudo chmod -R 777 要挂载的文件夹/
```

:::tip
取消挂载可以使用`sudo umount /mnt/webdav` (TODO 待验证)
:::

**ubuntu自动挂载**

```bash
## 设置密码
sudo vim /etc/davfs2/secrets
## 按以下格式追加到文件末尾就可以
http://10.42.0.180/webdav/Share_data/ 用户名 密码
```

下次挂载的时候就无需密码了

**开机自动挂载**

在 `/etc/fstab` 末尾追加：
```
http://10.42.0.180/webdav/Share_data/ /home/qyswarm/data_server/share/ davfs rw,uid=0,gid=0 0 0
```


