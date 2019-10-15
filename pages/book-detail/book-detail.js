// pages/book-detail/book-detail.js
import {
  Book
} from '../../api/book';
import {
  LikeModel
} from '../../api/like';
const bookModel = new Book();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    detail: {},
    likeStatus: false,
    likeCount: 0,
    posting: false
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

  onLike(e) {
    const like_or_cancle = e.detail.behavior;
    likeModel.like(like_or_cancle, this.data.book.id, 400);
  },
  onFakePost() {
    this.setData({
      posting: true
    });
  },
  onCancle() {
    this.setData({
      posting: false
    });
  },
  onPost(e) {
    const comment = e.detail.text || e.detail.value;

    if (comment.length > 12) {
      wx.wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      });
      return;
    }

    bookModel.postComment(this.data.book.id, comment)
      .then(res => {
        wx.showToast({
          title: '+1',
          icon: 'none'
        });
        this.data.comments.unshift({
          content: comment,
          nums: 1
        });
        this.setData({
          comments: this.data.comments,
          posting: false
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