// pages/member/member.js
//获取应用实例
const app = getApp();

Page({   
    data: {      
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
           
    },
        //事件处理函数
     toOrder: function() {  
        wx.navigateTo({   
            url: '../order/order'  
        }) 
    }
})