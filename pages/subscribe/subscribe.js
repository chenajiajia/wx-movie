// pages/subscribe/subscribe.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    offset:0,
    subscribe:[]
  },

  getSubscribeList:function(){
    var that = this;
    var offset = this.data.offset
    var id = wx.getStorageSync("openId");
    var url = app.globalData.BaseUrl + app.globalData.getSubscribe
    wx.request({
      url: url,
      data: { "id": id, "start": offset },
      method: "post",
      success: function (res) {
        var end = false;
        if(res.data.data.length<10){
          end = true;
        }
        var subscribe = that.data.subscribe;
        for(let item in res.data.data){
          subscribe.push(res.data.data[item]);
        }
        var offset = that.data.offset;
        offset += res.data.data.length;
        that.setData({
          subscribe: subscribe,
          offset: offset,
          end:end
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
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
    this.getSubscribeList();
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
      console.log('bottom');
      if(this.data.end){
        return;
      }
      this.getSubscribeList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})