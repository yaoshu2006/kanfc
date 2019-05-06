import req from '../../utils/request.js'
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        code: '',
        redirect_url: ''
    },

    handBackIndex() {
        wx.reLaunch({
            url: 'pages/home/home',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this
        that.setData({
            redirect_url: decodeURIComponent(options.redirect_url)
        })
        wx.login({
            success: function(res) {
                if (res.code) {
                    that.setData({
                        code: res.code
                    })
                }
            }
        })
    },

    bindGetUserInfo: function(e) {
        if (!e.detail.userInfo) {
            return;
        }
        wx.setStorageSync('userInfo', e.detail.userInfo)
        this.login();
    },

    login: function() {
        let that = this;
        req.post('/wx/login.htm', {}, {
            code: that.data.code
        }).then(function(res) {
            wx.setStorageSync("uesrMode", res.data.token.uesrMode)
            req.token(res.data.token.token, res.data.token.uid)
            if (res.data.token.uesrMode == 0 || res.data.token.uesrMode == 1) {
                // 登录成功
                that.registerUser();
                return;
            }
            if (res.data.uesrMode == 2) {
                // 登录错误
                wx.hideLoading();
                wx.showModal({
                    title: '提示',
                    content: '无法登录，请重试',
                    showCancel: false
                })
                return;
            }
            if (that.data.redirect_url) {
                wx.reLaunch({
                    url: that.data.redirect_url,
                })
            } else {
                that.handBackIndex()
            }
        })
    },

    registerUser: function() {
        let that = this;
        wx.getUserInfo({
            success: function(res) {
                let iv = res.iv;
                let encryptedData = res.encryptedData;
                let referrer = '' // 推荐人
                let referrer_storge = wx.getStorageSync('referrer');
                if (referrer_storge) {
                    referrer = referrer_storge;
                }
                // 下面开始调用注册接口
                req.post('/user/register/complex', {
                    code: that.data.code,
                    encryptedData: encryptedData,
                    iv: iv,
                    referrer: referrer
                }).then(function(res) {
                    wx.hideLoading();
                    that.login();
                })
            }
        })
    }
})