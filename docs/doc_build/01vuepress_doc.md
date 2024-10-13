---
title: 01vuepress_doc
createTime: 2024/10/13 14:45:03
permalink: /article/4n9ntwua/
---


## 在windows上构建环境

### 安装nodejs

### 安装pnpm


## 在ubuntu上构建环境

安装构建环境
```bash
curl -fsSL https://get.pnpm.io/install.sh | sh
# nodejs
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install 22
node -v # should print `v22.9.0`
```

```bash
git clone https://github.com/hyaline-wang/Knowledge-Base.git
cd Knowledge-Base
pnpm intsall 

# 运行本地服务
pnpm docs:dev

```
