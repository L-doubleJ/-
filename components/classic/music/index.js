// components/classic/music/index.js
import {
  classicBehavior
} from '../classic-behavior';
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBehavior],
  properties: {
    src: String,
    title: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    pauseSrc: 'images/player@pause.png',
    playSrc: 'images/player@play.png',
    playing: false
  },
  attached(e) {
    this._recoverStatus();
    this._monitorSwitch();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPlay() {
      if (!this.data.playing) {
        this.setData({
          playing: true
        });
        mMgr.src = this.properties.src;
        mMgr.title = this.properties.title;
      } else {
        this.setData({
          playing: false
        });
        mMgr.pause();
      }
    },
    _recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        });
        return;
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        });
      }
    },

    _monitorSwitch() {
      mMgr.onPlay(() => {
        this._recoverStatus();
      });
      mMgr.onPause(() => {
        this._recoverStatus();
      });
      mMgr.onStop(() => {
        this._recoverStatus();
      });
      mMgr.onEnded(() => {
        this._recoverStatus();
      });
    }

  }
})