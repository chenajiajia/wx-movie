// pages/person/person.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect:[],
    userInfo:null
  },
  tofavorite:function(){
    wx.navigateTo({
      url: '/pages/person/favorite/favorite',
    })
  },
  bindMore:function(){
    wx.navigateTo({
      url: '/pages/person/collect/collect',
    })
  },
  getCollectList:function(){
    var that = this;
    var id = wx.getStorageSync("openId");
    var url = app.globalData.BaseUrl + app.globalData.getCollect;

    wx.request({
      url: url,
      method: 'post',
      data: { 'id': id, 'start': 0 },
      success: function (res) {
        that.setData({
          collect: res.data.data
        })
      }
    })
  },
  bindMovieDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + id
    });
  },
  phoneCall:function(){
    wx.makePhoneCall({
      phoneNumber: '18818429638' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var that = this;
    app.getUser(function (userInfo) {
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo: userInfo
      });
    })
    this.getCollectList();

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
    this.getCollectList();
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