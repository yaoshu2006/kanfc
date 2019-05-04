import req from '../../utils/request.js'
var app = getApp()
Page({
    data: {
        send: false,
        alreadySend: false,
        second: 60,
        disabled: true,
        buttonType: 'default',
        phoneNum: '',
        code: '',
        otherInfo: ''
    },
    
    // 手机号部分
    inputPhoneNum: function (e) {
        let phoneNum = e.detail.value
        if (phoneNum.length === 11) {
            let checkedNum = this.checkPhoneNum(phoneNum)
            if (checkedNum) {
                this.setData({
                    phoneNum: phoneNum
                })
                console.log('phoneNum' + this.data.phoneNum)
                this.showSendMsg()
                this.activeButton()
            }
        } else {
            this.setData({
                phoneNum: ''
            })
            this.hideSendMsg()
        }
    },

    checkPhoneNum: function (phoneNum) {
        let str = /^1\d{10}$/
        if (str.test(phoneNum)) {
            return true
        } else {
            wx.showToast({
                title: '手机号不正确',
                image: '../../images/fail.png'
            })
            return false
        }
    },

    showSendMsg: function () {
        if (!this.data.alreadySend) {
            this.setData({
                send: true
            })
        }
    },

    hideSendMsg: function () {
        this.setData({
            send: false,
            disabled: true,
            buttonType: 'default'
        })
    },

    sendMsg: function () {
        var phoneNum = this.data.phoneNum;
        var sessionId = wx.getStorageSync('sessionId');
        //TODO 获取验证码
        this.setData({
            alreadySend: true,
            send: false
        })
        this.timer()
    },

    timer: function () {
        let promise = new Promise((resolve, reject) => {
            let setTimer = setInterval(
                () => {
                    this.setData({
                        second: this.data.second - 1
                    })
                    if (this.data.second <= 0) {
                        this.setData({
                            second: 60,
                            alreadySend: false,
                            send: true
                        })
                        resolve(setTimer)
                    }
                }
                , 1000)
        })
        promise.then((setTimer) => {
            clearInterval(setTimer)
        })
    },

    // 验证码
    addCode: function (e) {
        this.setData({
            code: e.detail.value
        })
        this.activeButton()
        console.log('code' + this.data.code)
    },

    // 按钮
    activeButton: function () {
        let { phoneNum, code, otherInfo } = this.data
        console.log(code)
        if (phoneNum && code && otherInfo) {
            this.setData({
                disabled: false,
                buttonType: 'primary'
            })
        } else {
            this.setData({
                disabled: true,
                buttonType: 'default'
            })
        }
    },

    onSubmit: function () {
        var phoneNum = this.data.phoneNum;
        var code = this.data.code;
        var otherInfo = this.data.otherInfo;
        var sessionId = wx.getStorageSync('sessionId');
    }
})