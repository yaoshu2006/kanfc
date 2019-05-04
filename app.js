import req from 'utils/request.js'
//app.js
App({
    onLaunch: function() {
        let that = this
        that.configReq()
    },

    checkLoginInfo: function (url) {//验证登录状态
        let token = wx.getStorageSync('token')
        if (!token) {
            wx.redirectTo({
                url: '/pages/auth/index?back=' + encodeURIComponent(url),
            })
        } else {
            wx.navigateTo({
                url: url,
            })
        }
    },
    getUserInfo: function(cb) {
        var that = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            });
        }
    },
    globalData: {
        userInfo: null
    },
    configReq() {
        let that = this
        //配置baseUrl和拦截器，baseUrl例如 /api
        req.baseUrl("http://api.sis1024.vip")
            .interceptor(res => {
                switch (res.statusCode) {
                    case 401:
                        wx.showToast({
                            icon: 'loading',
                            title: '重新登录',
                        })
                        return false;
                    case 200:
                        return true;
                    default:
                        wx.showToast({
                            title: '操作失败',
                        })
                        return false;
                }
            })
    },
})