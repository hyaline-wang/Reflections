---
title: 服务器申请流程
createTime: 2024/10/22 14:09:08
permalink: /easy_server_manage/user_manage/tgm1160i/
---

这里解释一下 下面操作的含义 
1. 通过ssh-keygen 命令 生成 私钥和公钥 ，
2. 将公钥 复制一份 并重命名为你的名字.pub（为了之后便于区分，不要用中文，用全拼，例如：张三 就是 zhangsan.pub），
3. 最后将 你的名字.pub这个公钥发给管理员，
4. 等待 管理员完成配置，

以下是详细操作,分 windows和ubuntu 两种


## 本机是windows
1. 开始之前，确保自己 电脑上安装了 git（没有的话从下面链接下载即可，安装的时候除了安装路径可以自定义外，其他都推荐选择默认）
<LinkCard title="git" href="https://git-scm.com/" description="" />

2. 打开git_bash（如下图所示，任意地方右键或在windows 栏输入均可）


:::: card-grid
::: card title=""
![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hyaline_kb/user_manage/image_20241023202748.png)
:::

::: card title="" 
![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hyaline_kb/user_manage/image_20241023202840.png)
:::
::::


3. 输入 ssh-keygen ，回车 ，如下所示，会询问你 密钥存储路径和和密码，都不用管，直接回车，直到结束
![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hyaline_kb/user_manage/image_20241023202912.png)

4. 生成后 请在 .ssh 目录下找到 id_rsa.pub(公钥)，.ssh文件夹在C://User/用户名/ 目录下，如下图所示
![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hyaline_kb/user_manage/image_20241023202945.png)
5. 在 .ssh 目录中找到 id_rsa.pub（注：id_rsa 是私钥）
![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hyaline_kb/user_manage/image_20241023203024.png)
6. 将公钥复制一份并重命名为 你的名字.pub（为了之后便于区分，不要用中文，用全拼，例如：张三 就是 zhangsan.pub）（注意不要改私钥的名字，只改公钥）
6. 将 你的名字.pub 公钥发给 管理员
7. 等待 管理员配置完成（注：可能有时候会有多个人在注册账户，所以可能会忘记，所以如果长时间没有回复，请再次提醒我，以防我忘掉）
8. 测试能否登录

:::info
- 注1：由于pip 和 conda 的操作大都不需要 sudo 权限，为了安全起见 创建账户时
都没有给 sudo 权限 ，特殊需要的可以找管理员
- 注2：提醒一下，密钥分为公钥和私钥，默认名字分别是 id_rsa 和id_rsa.pub ,
带pub的是公钥另一个是私钥，公钥可以随便发，私钥请不要发给任何人，仅限自己使用
:::

==至此，你在服务器上的账号创建完成==

## 本机是 ubuntu


```bash
sudo apt update
sudo apt install git
# ssh-keygen 的选项一路回车就行
ssh-keygen
cat ~/.ssh/id_rsa.pub > 你的名字.pub

# 接着 把当前目录 下 你的名字.pub 发给管理员
# 等待 管理员配置完成（注：可能有时候会有多个人在注册账户，所以可能会忘记，
# 所以如果长时间没有回复，请再次提醒管理员，以防管理员忘掉）
# 测试能否登录
```

:::info
- 注1：由于pip 和 conda 的操作大都不需要 sudo 权限，为了安全起见 创建账户时
都没有给 sudo 权限 ，特殊需要的可以找管理员
- 注2：提醒一下，密钥分为公钥和私钥，默认名字分别是 id_rsa 和id_rsa.pub ,
带pub的是公钥另一个是私钥，公钥可以随便发，私钥请不要发给任何人，仅限自己使用
:::

==至此，你在服务器上的账号创建完成==


