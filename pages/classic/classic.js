// pages/classic/classic.js
import {
  ClassiModel
} from '../../api/classic';
import {
  LikeModel
} from '../../api/like';
let classiModel = new ClassiModel();
let likeModel = new LikeModel();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    classic: {},
    latest: true,
    first: false,
    likeCount: 0,
    likeStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classiModel.getLatest(res => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      });
    });
  },

  onLike(e) {
    let behavior = e.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  onNext(e) {
    this._updateClassic('next');
  },
  onPrevious(e) {
    this._updateClassic('previous');
  },
  _updateClassic(type) {
    let index = this.data.classic.index;
    classiModel.getClassic(index, type, res => {
      this._getLikeStatus(res.id, res.type);
      this.setData({
        classic: res,
        latest: classiModel.isLatest(res.index),
        first: classiModel.ifFirst(res.index)
      });
    });
  },
  _getLikeStatus(artID, category) {
    likeModel.getClassLikeStatus(artID, category, res => {
      this.setData({
        likeCount: res.data.fav_nums,
        likeStatus: res.data.like_status
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {}
});