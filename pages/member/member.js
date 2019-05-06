import req from '../../utils/request.js'//获取应用实例
const app = getApp();

Page({   
    data: {      
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        user: {},
        jifen: {}
    },

    onLoad: function (options) {
        let that = this
        if (wx.getStorageSync("token")) {
            that.setData({
                userInfo: wx.getStorageSync("userInfo"),
                hasUserInfo: true
            })
        }
        req.get('/wx/userInfo.htm').then((res)=>{
            console.log(res)
            that.setData({
                user: res.data.user,
                jifen: res.data.jifen
            })
        })

    },


        //事件处理函数
    toAuth: function() {
        let that = this
        if (that.data.hasUserInfo) {
            return    
        }
        wx.navigateTo({   
            url: '../auth/index'  
        }) 
    }
})