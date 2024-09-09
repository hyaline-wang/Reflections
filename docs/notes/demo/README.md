---
title: 文档构建指南
createTime: 2024/09/06 22:07:13
permalink: /demo/
---

# 文档构建指南

文档基于vuepress 构建，使用了vuepress-theme-plume 主题，如果你想从零开始构建，请参考[安装/使用](https://theme-plume.vuejs.press/guide/quick-start/)。

## github action

将以下文件覆盖到 ==.github/deploy.yml== 中

```yaml
name: deploy

on:
  # 每当 push 到 master 分支时触发部署
  push:
    branches: [master]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          # "Last updated time" and other git log-related information require fetching all commit records.
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          # 选择要使用的 pnpm 版本
          version: 9
          # 使用 pnpm 安装依赖
          run_install: true
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          # 选择要使用的 node 版本
          node-version: 20
      # 运行构建脚本
      # Run the build script
      - name: Build VuePress site
        run: pnpm run docs:build

      # add CNAME
      - name: Add CNAME
        run: cp CNAME docs/.vuepress/dist
        
      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v4
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/cn/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

```

上面脚本中有几个注意点

- `CNAME` 需要提前创建到工程根目录下，如果不需要自定义域名，可以删除上面CNAME复制的那段
- 设置正确的[base](https://v2.vuepress.vuejs.org/zh/reference/config.html#base)

## 其他平台的部署

- 参考plume的[部署页面](https://theme-plume.vuejs.press/guide/deployment/)。


## pnpm docs:dev

- 修改.vuepress 中文件不会自动更新



## 图床 

:::caution
国内全部需要备案，所以OSS用起来也并不方便，

:::

1. 安装picgo 