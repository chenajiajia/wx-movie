// pages/movie/movie-more/movie-more.js
var app = getApp();
Page({
  data: {
    total:10000,
    tabRecommend:'recommend',
    tabMovie: "movie",
    tabSeries: "series",
    showRecommend:true,
    showMovie: false,
    showSeries: false,
    acquireRecommend: false,
    acquireMovie: false,
    acquireSeries: false,
    recommend:{},
    movie: {},
    series: {},
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var typeId = options.typeId;
    var readyData = {};
    if (typeId == "recommend") {
      readyData = { "showRecommend": true, "showMovie": false, "showSeries": false,"acquireRecommend": true };
    } 
    else if (typeId == "movie") {
      readyData = { "showMovie": true, "showRecommend": false, "showSeries": false, "acquireMovie": true };
    } else {
      readyData = { "showSeries": true, "showMovie": false, "showRecommend": false, "acquireSeries": true };
    }
    readyData["windowWidth"] = app.globalData.windowWidth;
    readyData["windowHeight"] = app.globalData.windowHeight;
    this.setData(readyData);
    wx.setStorageSync('recommendOffset', -1)
    wx.setStorageSync('movieOffset', -1)
    wx.setStorageSync('seriesOffset', -1)
    that.getMovieListData(typeId);
   
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  /** 通过typeId获取url */
  getURLByTypeId: function (typeId) {
    var url = app.globalData.BaseUrl;
    var id = wx.getStorageSync("openId");
    if (typeId == "recommend") {
      url += app.globalData.recommend+"?id="+id;
    } 
    else if (typeId == "movie") {
      url += app.globalData.movie;
    } else {
      url += app.globalData.series;
    }
    return url;
  },
  /** 获取电影数据 */
  getMovieListData: function (typeId) {
    var that = this;
    var offset = that.data[typeId].offset || 0;
    var total = that.data[typeId].total || 999;
    var typeOffset = typeId +"Offset";
    if (offset >= total || wx.getStorageSync(typeOffset)==offset) {
      return;
    }
    wx.setStorageSync(typeOffset, offset);
    var url = that.getURLByTypeId(typeId);
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      data: {
        start: offset,
      },
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var subjects = res.data.data;
        var movies = that.data[typeId].movies || [];
        var offset = that.data[typeId].offset || 0;
        //var total = res.data.total;
        offset += subjects.length;
       
        for(let item in subjects){
          movies.push(subjects[item])
        }
        // for (let idx in subjects) {
        //   var subject = subjects[idx];
        //   var directors = "";
        //   for (let i in subject.directors) {
        //     directors += subject.directors[i].name;
        //   }
        //   var casts = "";
        //   var separate = " / ";
        //   for (let j in subject.casts) {
        //     casts += subject.casts[j].name + separate;
        //   }
        //   casts = casts.substring(0, casts.length - separate.length);

        //   var genres = "";
        //   for (let k in subject.genres) {
        //     genres += subject.genres[k] + separate;
        //   }
        //   genres = genres.substring(0, genres.length - separate.length);
        //   var temp = {
        //     id: subject.id,
        //     title: subject.title,
        //     rating: subject.rating,
        //     collectCount: subject.collect_count,
        //     images: subject.images,
        //     subtype: subject.subtype,
        //     directors: directors,
        //     genres: genres,
        //     casts: casts,
        //     typeId: typeId,
        //     year: subject.year
        //   };
        //   movies.push(temp);
        // }
        var readyData = {};
        readyData[typeId] = {
          categoryType: typeId,
          offset: offset,
          //total: total,
          movies: movies
        }
        that.setData(readyData);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    });
  },
  /** 切换标签页 */
  bindSelected: function (event) {
    var that = this;
    var tabId = event.currentTarget.dataset.tabId;
    var readyData = {};
    if (tabId == "recommend") {
      console.log("recommend");
      readyData = { "showRecommend": true,"showMovie":false, "showSeries": false };
      if (!that.data.acquireRecommend) {
        readyData["acquireRecommend"] = true;
        that.getMovieListData(tabId);
      }
      this.setData(readyData);
    } 
   else if (tabId == "movie") {
      console.log("movie");
      readyData = { "showRecommend": false, "showMovie": true, "showSeries": false };
      if (!that.data.acquireMovie) {
        readyData["acquireMovie"] = true;
        that.getMovieListData(tabId);
      }
      this.setData(readyData);
    } else if (tabId == "series") {
      console.log("series");
      readyData = { "showRecommend": false, "showMovie": false, "showSeries": true };
      if (!that.data.acquireSeries) {
        readyData["acquireSeries"] = true;
        that.getMovieListData(tabId);
      }
      that.setData(readyData);
    } else {
      console.log("error");
    }
  },
  /** 跳转到电影详情 */
  bindMovieDetail: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-detail?id=' + id
    });
  },
  /** 页面滑动到底部 */
  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log("handleLower");
    var typeId = "";
    if (this.data.showRecommend) {
      typeId = "recommend";
    } 
    else if (this.data.showMovie) {
      typeId = "movie";
    } else {
      typeId = "series";
    }
    this.getMovieListData(typeId);
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 30000
    });
  },
  handleLower: function (event) {
    console.log("handleLower");
    var typeId = "";
    if (this.data.showRecommend) {
      typeId = "recommend";
    }
    else if (this.data.showMovie) {
      typeId = "movie";
    } else {
      typeId = "series";
    }
    this.getMovieListData(typeId);
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 30000
    });
  },
  /** 页面滑动到顶部 */
  handleUpper: function (event) {
    console.log("handleUpper");
  },
  /** 点击喜欢按钮 */
  handleWishtap: function (event) {
    wx.showModal({
      title: '提示',
      content: '一起去看吧',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      },
      showCancel: false
    });
  },
  /** 点击购票按钮 */
  handleTickettap: function (event) {
    wx.showModal({
      title: '提示',
      content: '用户点击购票',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  }

})