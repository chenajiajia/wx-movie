// pages/movie/movie-detail/movie-detail.js
var app = getApp();
Page({
  data: {
    showAllDesc: false,
    sub:'',
    col:'',
    movie: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var id = options.id;
    var where = options.from;
    var openId = wx.getStorageSync("openId")
    var url = app.globalData.BaseUrl + app.globalData.subject;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    wx.request({
      url: url,
      data:{"id":openId,"movieId":id,"from":where},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'json' }, // 设置请求的 header
      success: function (res) {
        var data = res.data.data;
        var sub = ''
        var col = ''
        if(data.sub == 1){
            sub = '已订阅'
        }else{
          sub = '订阅'
        }
        if(data.col == 1){
          col = '已收藏'
        }else{
          col = '收藏'
        }
        that.setData({
          sub:sub,
          col:col
        })
        var readyData = {};
        // var directorsAndCasts = [];
        // for (let i in data.directors) {
        //   directorsAndCasts.push(data.directors[i]);
        // }
        // for (let j in data.casts) {
        //   directorsAndCasts.push(data.casts[j]);
        // }
        // var genres = "";
        // var separate = " / ";
        // for (let k in data.genres) {
        //   genres += data.genres[k] + separate;
        // }
        // genres = genres.substring(0, genres.length - separate.length);
        // var countries = "国家：";
        // for (let g in data.countries) {
        //   countries += data.countries[g] + separate;
        // }
        // countries = countries.substring(0, countries.length - separate.length);
        readyData["movie"] = {
          id: data.movieId,
          title: data.title,
          images: data.cover,
          episode: data.episode,
          countries: data.district,
          genres: "地区" + data.category,
          originalTitle: "原名：" + data.title,
          rating: data.rating,
          summary: data.description,
          year: data.showTime,
          imageUrls: data.imageUrls
        };
        that.setData(readyData);
      },
      fail: function () {
        console.log("fail");
      },
      complete: function () {
        console.log("complete");
        wx.hideToast();
      }
    })
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
  /** 查看海报 */
  bindPoster: function (event) {
    var posterUrl = event.currentTarget.dataset.id;
    console.log("posterUrl-----"+posterUrl)
    wx.navigateTo({
      url: '/pages/movie/movie-detail/movie-poster/movie-poster?posterUrl=' + posterUrl
    });
  },
  /** 展开简介   */
  handleExtensiontap: function (event) {
    var readyData = {
      "showAllDesc": true
    };
    this.setData(readyData);
  },
  /** 用户点击订阅 */
  handleWishtap: function (event) {
    var openId = wx.getStorageSync("openId")
    var id = this.data.movie.id;
    var episode = this.data.movie.episode;
    

    if(this.data.sub == '已订阅'){
      var url = app.globalData.BaseUrl + app.globalData.dissubscribe;
      this.setData({
        sub:'订阅'
      })
      wx.request({
        url: url,
        method: "post",
        header: { 'content-type': 'json' },
        data: { "id": openId, "movieId": id, "episode": episode },
        success: function (res) {
          console.log(res)
          if (res.data.status == 0) {
            wx.showToast({
              title: '取消订阅',
            })
          } else {
            wx.showToast({
              title: '取消订阅成功',
            })
          }

        },
        fail: function (res) {
          wx.showLoading({
            title: res.message,
          })
        },
        complete: function () {
          //wx.hideLoading();
        }
      })
    }else{
      this.setData({
        sub:'已订阅'
      })
      var url = app.globalData.BaseUrl + app.globalData.subscribe;
      wx.request({
        url: url,
        method: "post",
        header: { 'content-type': 'json' },
        data: { "id": openId, "movieId": id, "episode": episode },
        success: function (res) {
          console.log(res)
          if (res.data.status == 0) {
            wx.showToast({
              title: '已订阅',
            })
          } else {
            wx.showToast({
              title: '订阅成功',
            })
          }

        },
        fail: function (res) {
          wx.showLoading({
            title: res.message,
          })
        },
        complete: function () {
          //wx.hideLoading();
        }
      })
    }

    
  },
  /** 用户点击收藏 */
  handleCollect: function (event) {
    var id = event.currentTarget.dataset.id;
    var openId = wx.getStorageSync("openId");

    if(this.data.col == '已收藏'){
      this.setData({
        col:'收藏'
      })
      var url = app.globalData.BaseUrl + app.globalData.discollect;
      wx.request({
        url: url,
        header: { 'content-type': 'json' },
        data: { "id": openId, "movieId": id },
        method: "POST",
        success: function (res) {
          if (res.data.status == 0) {
            wx.showToast({
              title: '已收藏',
            })
          } else {
            wx.showToast({
              title: '取消收藏成功',
            })
          }

        },
        fail: function (res) {
          wx.showToast({
            title: res.message,
          })
        },
        complete: function () {
          //wx.hideLoading();
        }
      })
    }else{
      this.setData({
        col:'已收藏'
      })
      var url = app.globalData.BaseUrl + app.globalData.collect;
      wx.request({
        url: url,
        header: { 'content-type': 'json' },
        data: { "id": openId, "movieId": id },
        method: "POST",
        success: function (res) {
          if (res.data.status == 0) {
            wx.showToast({
              title: '已收藏',
            })
          } else {
            wx.showToast({
              title: '收藏成功',
            })
          }

        },
        fail: function (res) {
          wx.showToast({
            title: res.message,
          })
        },
        complete: function () {
          //wx.hideLoading();
        }
      })
    }
    
  },
  /** 用户点击获取播放链接 */
  handleGetURL: function (event) {
    var title = event.currentTarget.dataset.id;
    var url = app.globalData.BaseUrl + app.globalData.getURL;
    var episode = this.data.movie.episode;

    wx.request({
      url: url,
      header: { 'content-type': 'json' },
      data: { "title":title, "episode":episode },
      method: "GET",
      success: function (res) {
        if (res.data.status == 2) {
          wx.showToast({
            title: '暂无此视频播放链接',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '复制成功',
          })
          var data = res.data.data;
          var url = data.url;
          wx.setClipboardData({
            data: url,
          })
          console.log(url);
        }

      },
      fail: function (res) {
        wx.showToast({
          title: res.message,
        })
      },
      complete: function () {
        //wx.hideLoading();
      }
    })
  },

  /** 用户点击看过 */
  handleDotap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/movie/movie-detail/rating/rating?id=' + id
    });
  },
  /** 查看影人信息 */
  handleCelebrity: function (event) {
    var id = event.currentTarget.dataset.id;
    var avatar = event.currentTarget.dataset.avatar;
    wx.redirectTo({
      url: '/pages/movie/movie-detail/celebrity/celebrity?id=' + id + "&&avatar=" + avatar
    });
  }
})