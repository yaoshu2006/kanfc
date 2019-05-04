import req from '../../utils/request.js'
// pages/signIn/signIn.js
//获取应用实例
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //img_url: config.imgUrl, //图片地址
        //签到模块
        signNum: 0, //签到数
        signState: false, //签到状态
        min: 1, //默认值日期第一天1
        max: 7, //默认值日期最后一天7
        be: 0, //默认倍数



        visible: false,
        sign: {},
        userInfo: {}

    },

    onLoad(option) {
        let that = this 
        that.setData({
            userInfo: wx.getStorageSync("userInfo")
        })
        req.get("/wx/getSignInfo.htm").then((res)=>{
            that.setData({
                sign: res.data
            })
        })
    },

    //签到
    bindSignIn(e) {
        let that = this
        req.get("/wx/sign.htm").then((res)=>{
            that.setData({
                sign: res.data.sign
            })
            wx.showModal({
                title: res.data.msg,
                showCancel: false
            })

            if (res.data.code == 0) {
                // 签到成功才有机会分享
                that.show()
            }
        })
    },


    //事件处理函数
    show: function () {
        this.setData({
            visible: true
        })
    },

    close: function () {
        this.setData({
            visible: false
        })
    },

})