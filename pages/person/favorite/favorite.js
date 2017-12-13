// pages/person/favorite/favorite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [
      { name: '喜剧', value: '0' },
      { name: '动作', value: '1', checked: 'true' },
      { name: '剧情', value: '2' },
      { name: '科幻', value: '3' },
      { name: '恐怖', value: '4' },
      { name: '文艺', value: '5' },
    ],
    locate: [
      { name: '美国', value: '0' },
      { name: '中国', value: '1', checked: 'true' },
      { name: '巴西', value: '2' },
      { name: '日本', value: '3' },
      { name: '英国', value: '4' },
      { name: '法国', value: '5' },
    ]
  },
  serviceValChange: function (e) {
    var type = this.data.type;
    var checkArr = e.detail.value;
    for (var i = 0; i < type.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        type[i].checked = true;
      } else {
        type[i].checked = false;
      }
    }
    this.setData({
      type: type
    })
  } ,
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