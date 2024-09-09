---
title: cpack打包
createTime: 2024/09/09 11:11:33
permalink: /linux_base/ut2nvgtg/
---

# cpack打包

参考rtabmap的[CMakeLists.txt](https://github.com/introlab/rtabmap/blob/3b7c6cd1f45df84066ef554e0b69bd4fcdab3cd0/CMakeLists.txt
)

## 前提

设置了 install 以及相关路径
:::info
以`home`为例
:::
```cmake
install(TARGETS pubsub_multithread_inproc
COMPONENT linapp
RUNTIME DESTINATION "/home/"
LIBRARY DESTINATION "/home/"
DESTINATION "/home/"

)

####################
######Cpack########
SET(CPACK_GENERATOR "DEB")
SET(CPACK_DEBIAN_PACKAGE_MAINTAINER "Wanghao") #required


SET(CPACK_DEBIAN_PACKAGE_DEPENDS "cppzmq")

INCLUDE(CPack)
```

打包
```
mkdir build
cd build
cmake ..
make
cpack
```