// pages/book-detail/book-detail.js
import {
  Book
} from '../../api/book';
const bookModel = new Book();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    detail: {},
    likeStatus: false,
    likeCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const bid = options.bid;
    const detail = bookModel.getDetail(bid);
    const comments = bookModel.getComments(bid);
    const likeStatus = bookModel.getLikeStatus(bid);
    detail.then(res => {
      this.setData({
        book: res.data
      });
    });
    comments.then(res => {
      this.setData({
        comments: res.data.comments
      });
    });
    likeStatus.then(res => {
      this.setData({
        likeStatus: res.data.like_status,
        likeCount: res.data.fav_nums
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})