---
title: apache_qc
createTime: 2024/09/07 01:08:09
permalink: /linux_base/xw2lxlst/
---
# 安装




# 基本操作

配置文件默认位于 `/etc/apache2`

当我们有域名时，可以多个服务复用80端口。

对于 使用80 端口, 域名为 `home.qyswarm.top`,将其映射到`/home/qyswarm/apache2siteFile`文件夹。
```xml
<VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        ServerName home.qyswarm.top
        <Directory /home/qyswarm/apache2siteFile>
                Options Indexes FollowSymLinks
                AllowOverride None
                Require all granted
        </Directory>
        ServerAdmin webmaster@localhost
        DocumentRoot /home/qyswarm/apache2siteFile
        
        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

</VirtualHost>



```



# 文件夹美化








# With Gitlab
当gitlab使用本机安装， 使用默认端口30000 ，`/etc/apache2/sites-available/gitlab.conf`的配置如下


## 假设在公网有一个域名
```xml
<VirtualHost *:80>
  ServerName gitlab.qyswarm.top

  ProxyRequests off
  ProxyPass / http://127.0.0.1:30000
  ProxyPassReverse / http://127.0.0.1:30000
</VirtualHost>
```

以上设置可以避免出现**webIDE 打不开工程**  的情况

## 没有域名

```
external_url 'http://gitlab.qyswarm.top/'
nginx['listen_port'] = 40000



# 目前还是不对
# pages_external_url "http://gitlab-page.qyswarm.top/"
# gitlab_pages['listen_proxy'] = "localhost:33441"
```

## Gitlab webIDE 打不开 工程 
[https://forum.gitlab.com/t/webide-wont-open/18680/20](https://forum.gitlab.com/t/webide-wont-open/18680/20)

```xml
<VirtualHost *:80>
  ServerName gitlab.qyswarm.top

  ProxyRequests off
  ProxyPass / http://10.42.0.1:40000/ nocanon
  ProxyPassReverse / http://10.42.0.1:40000/
  AllowEncodedSlashes NoDecode

</VirtualHost>
```

# 文件列表美化
- [https://github.com/oupala/apaxy#installation](https://github.com/oupala/apaxy#installation)
- [https://github.com/ramlmn/Apache-Directory-Listing](https://github.com/ramlmn/Apache-Directory-Listing
)



# Gitlab
> 假设在公网有一个域名

```
external_url 'http://gitlab.qyswarm.top/'
nginx['listen_port'] = 40000



# 目前还是不对
# pages_external_url "http://gitlab-page.qyswarm.top/"
# gitlab_pages['listen_proxy'] = "localhost:33441"
```

# Gitlab webIDE 打不开 工程 
[https://forum.gitlab.com/t/webide-wont-open/18680/20](https://forum.gitlab.com/t/webide-wont-open/18680/20)

```xml
<VirtualHost *:80>
  ServerName gitlab.qyswarm.top

  ProxyRequests off
  ProxyPass / http://10.42.0.1:40000/ nocanon
  ProxyPassReverse / http://10.42.0.1:40000/
  AllowEncodedSlashes NoDecode

</VirtualHost>
```