const req = require('../../utils/request.js')
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        backUrl: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        that.setData({
            backUrl: decodeURIComponent(options.back)
        })
    },

    bindGetUserInfo: function (e) {
        if (!e.detail.userInfo) {
            return;
        }
        wx.setStorageSync('userInfo', e.detail.userInfo)
        this.login();
    },

    login: function () {
        let that = this;
        wx.login({
            success: function (res) {
                
                // req.post('/oauth/wxLogin.htm', {
                //     js_code: res.code
                // }).then(function (res) {
                //     if (res.data.code == 10000) {
                //         wx.setStorageSync('token', res.data.token)
                //         // 去注册
                //         that.registerUser();
                //         return;
                //     }
                //     if (res.data.code != 0) {
                //         // 登录错误
                //         wx.hideLoading();
                //         wx.showModal({
                //             title: '提示',
                //             content: '无法登录，请重试',
                //             showCancel: false
                //         })
                //         return;
                //     }
                //     wx.setStorageSync('token', res.data.token)
                //     wx.setStorageSync('uid', res.data.uid)
                //     // 回到原来的地方放
                //     app.navigateToLogin = false
                //     wx.navigateBack();
                // })
            }
        })
    },

    registerUser: function () {
        let that = this;
        wx.login({
            success: function (res) {
                let code = res.code; // 微信登录接口返回的 code 参数，下面注册接口需要用到
                wx.getUserInfo({
                    success: function (res) {
                        let iv = res.iv;
                        let encryptedData = res.encryptedData;
                        let referrer = '' // 推荐人
                        let referrer_storge = wx.getStorageSync('referrer');
                        if (referrer_storge) {
                            referrer = referrer_storge;
                        }
                        // 下面开始调用注册接口
                        api.post('/user/register/complex', {
                            code: code,
                            encryptedData: encryptedData,
                            iv: iv,
                            referrer: referrer
                        }).then(function (res) {
                            wx.hideLoading();
                            that.login();
                        })
                    }
                })
            }
        })
    }
})
