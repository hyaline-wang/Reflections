import { defineNavbarConfig } from 'vuepress-theme-plume'

export const zhNavbar = defineNavbarConfig([
  { text: '首页', link: '/' },
  { text: '博客', link: '/blog/' },
  // { text: '标签', link: '/blog/tags/' },
  // { text: '归档', link: '/blog/archives/' },
  {
    text: '笔记',
    items: [
      { text: 'px4源码解析', link: '/notes/px4code/README.md' },
      { text: 'linux基础', link: '/notes/linux_base/README.md' },
      { text: '机器人基础', link: '/notes/robot_base/README.md' },
      { text: '硬件文档', link: '/notes/normal_hw/机载传感器/rtk.md' },
      { text: '简易服务器管理', link: '/notes/easy_server_manage/用户指南/user_manage.md' },
      { text: '生产文档', link: '/notes/production_doc/' }
    ]
  },
])

export const enNavbar = defineNavbarConfig([
  { text: 'Home', link: '/en/' },
  { text: 'Blog', link: '/en/blog/' },
  { text: 'Tags', link: '/en/blog/tags/' },
  { text: 'Archives', link: '/en/blog/archives/' },
  {
    text: 'Notes',
    items: [{ text: 'Demo', link: '/en/notes/demo/README.md' }]
  },
])

