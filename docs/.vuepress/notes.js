import { defineNoteConfig, defineNotesConfig } from 'vuepress-theme-plume'

/* =================== locale: zh-CN ======================= */

const zhDemoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo', 'bar'],
})

const zhPx4CodeNote = defineNoteConfig({
  dir: 'px4code',
  link: '/px4code',
  sidebar: ['', 'atti_control', 'EKF_height','px4_mode','firmware_change','mc_mixer'],
})

const zhRobotBaseNote = defineNoteConfig({
  dir: 'robot_base',
  link: '/robot_base',
  // sidebar: ['', 'mc_model','rigidbody_model'],
  sidebar: 'auto',

})


const zhLinuxBaseNote = defineNoteConfig({
  dir: 'linux_base',
  link: '/linux_base',
  // sidebar: ['', 'sougou_install','apache_qs'],
  sidebar: 'auto'
})

const zhNormalHwBaseNote = defineNoteConfig({
  dir: 'normal_hw',
  link: '/normal_hw',
  // sidebar: ['', 'vimedge2'],
  sidebar: 'auto'

})

export const zhNotes = defineNotesConfig({
  dir: 'notes',
  link: '/',
  notes: [zhDemoNote,zhPx4CodeNote,zhRobotBaseNote,zhNormalHwBaseNote,zhLinuxBaseNote],
})

/* =================== locale: en-US ======================= */

const enDemoNote = defineNoteConfig({
  dir: 'demo',
  link: '/demo',
  sidebar: ['', 'foo', 'bar'],
})

export const enNotes = defineNotesConfig({
  dir: 'en/notes',
  link: '/en/',
  notes: [enDemoNote],
})

