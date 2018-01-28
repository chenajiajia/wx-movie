// pages/person/favorite/favorite.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: [
      { name: '喜剧', value: '0' },
      { name: '动作', value: '1'},
      { name: '剧情', value: '2' },
      { name: '科幻', value: '3' },
      { name: '恐怖', value: '4' },
      { name: '文艺', value: '5' },
    ],
    locate: [
      { name: '美国', value: '0' },
      { name: '中国', value: '1' },
      { name: '巴西', value: '2' },
      { name: '日本', value: '3' },
      { name: '英国', value: '4' },
      { name: '法国', value: '5' },
    ],
    decade:[
      { name: '80年代', value: '0' },
      { name: '90年代', value: '1' },
      { name: '00年代', value: '2' },
      { name: '10年代', value: '3' }
     
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
  locateValChange: function (e) {
    var locate = this.data.locate;
    var checkArr = e.detail.value;
    for (var i = 0; i < locate.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        locate[i].checked = true;
      } else {
        locate[i].checked = false;
      }
    }
    this.setData({
      locate: locate
    })
  },
  decadeValChange: function (e) {
    var decade = this.data.decade;
    var checkArr = e.detail.value;
    for (var i = 0; i < decade.length; i++) {
      if (checkArr.indexOf(i + "") != -1) {
        decade[i].checked = true;
      } else {
        decade[i].checked = false;
      }
    }
    this.setData({
      decade: decade
    })
  },
  bindTap:function(){
    var categoryList = [];
    var type = this.data.type;
    for (var i = 0; i < type.length; i++) {
      if (type[i].checked == true) {
        categoryList.push(type[i].name);
      } 
    }
    var locateList = [];
    var locate = this.data.locate;
    for (var i = 0; i < locate.length; i++) {
      if (locate[i].checked == true) {
        locateList.push(locate[i].name);
      }
    }
    var decadeList = [];
    var decade = this.data.decade;
    for (var i = 0; i < decade.length; i++) {
      if (decade[i].checked == true) {
        decadeList.push(decade[i].name);
      }
    }

    var id = wx.getStorageSync("openId");
    var url = app.globalData.BaseUrl + app.globalData.favorite;
    wx.request({
      url: url,
      method: 'post',
      data: { 'id': id, 'category': categoryList,'locate':locateList,'decade':decadeList },
      success: function (res) {
        wx.showToast({
          title: '保存成功',
        })
        wx.navigateBack({
          
        })
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = wx.getStorageSync("openId");
    var url = app.globalData.BaseUrl + app.globalData.getFavorite;
    wx.request({
      url: url,
      method: 'post',
      data: { 'id': id },
      success: function (res) {console.log(res);
       var categoryList = res.data.data.category || '';
       var locateList = res.data.data.locate || '';
       var decadeList = res.data.data.decade || '';
       var category = that.data.type;
       var locate = that.data.locate;
       var decade = that.data.decade;

       for(var i = 0;i<categoryList.length;i++){
         for(var j = 0;j<category.length;j++){
           if(category[j].name == categoryList[i]){
             category[j].checked = true;
           }
         }
       }
        for(var i = 0;i<locateList.length;i++){
         for(var j = 0;j<locate.length;j++){
           if (locate[j].name == locateList[i]){
             locate[j].checked = true;
           }
         }
       }
        for (var i = 0; i < decadeList.length; i++) {
          for (var j = 0; j < decade.length; j++) {
            if (decade[j].name == decadeList[i]) {
              decade[j].checked = true;
            }
          }
        }

        that.setData({
          type:category,
          locate:locate,
          decade:decade
        })
      }
    })
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