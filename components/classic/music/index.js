// components/classic/music/index.js
import {
  classicBehavior
} from '../classic-behavior'

Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})