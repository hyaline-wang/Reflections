---
title: MIPI CSI DSI
createTime: 2024/09/09 16:52:43
permalink: /normal_hw/camera/dhyvx244/
---

# 什么是MIPI
它的全称为 “Mobile Industry Processor Interface”,MIPI并不是一个单一的接口或协议，而是包含了一套协议和标准，以满足各种子系统独特的要求。MIPI的标准异常复杂，包含非常多的应用领域。

![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hao_doc/Pasted%20image%2020240802152533.png)

最常见的应该是 DSI (用于屏幕)和 CSI-2(用于摄像头)。


在物理层有 D-PHY  (500Mbit/s) 和 M-PHY (1000Mbit/s)

> D在罗马数字中代表 500,M代表 1000，C 代表100 (C-PHY)


# CSI协议
1. CSI协议有两个版本协议，分别为CSI-2和CSI-3；
2. CSI-2协议遵循的物理标准有两个，分别为C-PHY和D-PHY；
3. CSI-3协议的物理标准对应M-PHY，且应用层协议栈还需要连接Uni-Pro层。


![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hao_doc/Pasted%20image%2020240802153515.png)

# CSI-2协议

> 很容易看出来，CSI-是一种全双工的协议， 电脑->相机是小带宽的控制指令(400Khz)，相机->电脑是大带宽数据。

CSI Transmitter 的部分


CSI-2 的物理层有 C-Python
D-PHY协议最多支持5个Lane（通道）（一个时钟Lane，4个数据Lane），最少需要两个Lane（一个时钟Lane，一个数据Lane）。




![](https://emnavi-doc-img.oss-cn-beijing.aliyuncs.com/hao_doc/Pasted%20image%2020240802145959.png)