---
title: 中文输入法安装
createTime: 2024/09/07 12:23:02
permalink: /linux_base/common_pkg_install/fh3pxjmn/
---

# 中文输入法安装

测试系统
- ubuntu 20.04

## 设置中文语言
打开 系统设置——区域和语言——管理已安装的语言——在“语言”tab下——点击“添加或删除语言”
![](https://shurufa.sogou.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-1.8106d423.jpg&w=640&q=75)
弹出“已安装语言”窗口，勾选中文（简体），点击应用
![](https://shurufa.sogou.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fstep-2.4afc85d1.jpg&w=640&q=75)
## 安装
[sogou](https://shurufa.sogou.com/linux/guide)

```
mkdir -p install && cd install 
sudo apt-get install fcitx
sudo apt purge ibus
sudo apt install -y libqt5qml5 libqt5quick5 libqt5quickwidgets5 qml-module-qtquick2
sudo apt install -y libgsettings-qt1s
wget http://10.42.0.1:8890/Software/sogoupinyin_4.2.1.145_amd64.deb
sudo dpkg -i sogoupinyin_4.2.1.145_amd64.deb

```