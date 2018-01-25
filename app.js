App({
    onLaunch: function () {
        var that = this;
        // 使用设备可视宽高
        wx.getSystemInfo({
            success: function (res) {
                that.globalData.windowWidth = res.windowWidth;
                that.globalData.windowHeight = res.windowHeight;
            }
        });
        this.getUserInfo();
    },
    getUser:function(cb){
      var that = this;
       if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo);
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo);
                        }
                    })
                }
            });
        }
    },
    getUserInfo: function (cb) {
        var that = this;
        var id = '';
        // if (this.globalData.userInfo) {
        //     typeof cb == "function" && cb(this.globalData.userInfo);
        // } else {
        //     //调用登录接口
        //     wx.login({
        //         success: function () {
        //             wx.getUserInfo({
        //                 success: function (res) {
        //                     that.globalData.userInfo = res.userInfo;
        //                     typeof cb == "function" && cb(that.globalData.userInfo);
        //                 }
        //             })
        //         }
        //     });
        // }
        wx.login({
          success:function(res){
            
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'http://127.0.0.1:5000/user/getOpenId',
                data: {
                  code: res.code
                },
                success:function(res){
                  console.log(res)
                   id = res.data.data.openid
                   wx.setStorageSync('openId', id)
                   console.log(wx.getStorageSync('openId'))
                    wx.getUserInfo({
                      success:function(res){
                        var nickName = res.userInfo.nickName
                        var gender = res.userInfo.gender
                        var city = res.userInfo.city
                        var avatarUrl = res.userInfo.avatarUrl
                        
                        console.log(id)
                        wx.request({
                          url: "http://127.0.0.1:5000/user/login",
                          data: { "id": id, "nickName": nickName, "gender": gender, "city": city,"avatarUrl":avatarUrl},
                          success:function(res){
                            wx.setStorage({
                              key: 'userInfo',
                              data: res.data,
                            })
                          }
                        })
                      }
                    })
                }
              })
            } else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
         
          }
          
        })
    },
    globalData: {
        code:'',
        userInfo: null,
        windowWidth: 0,
        windowHeight: 0,
        BaseUrl: "http://127.0.0.1:5000",
        subscribe:"/subscription/subscribe",
        getSubscribe:"/subscription/getSubscription",
        collect: "/user/collect",
        getCollect:'/user/getCollect',
        favorite: '/user/setFavourite',
        getFavorite:'/user/getFavourite',
        movie: "/movie/getMovies",
        series: "/movie/getTv",
        recommend:"/movie/getRecommend",
        top250: "/v2/movie/top250",
        weekly: "/v2/movie/weekly",
        usBox: "/v2/movie/us_box",
        newMovies: "/v2/movie/new_movies",
        subject: "/movie/getSubjectDetail",
        celebrity: "/v2/movie/celebrity/",
        search: "/v2/movie/search?q="
    }
})