import wfc from '../../../utils/wfc.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        redball: [],
        blueball: [],


        //选中的
        ballbox: [],
        count: 1,
        value: 0 //所需总积分
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this
        that.reset()
    },

    selectball: function(e) {
        let that = this
        let color = e.currentTarget.dataset.color
        let index = e.currentTarget.dataset.index
        let select = e.currentTarget.dataset.select
        if (!that.validData(color, select)) {
            wx.showModal({
                title: '按双色球规定选择红球和篮球',
                showCancel: false
            })
            return
        }
        let param = ""
        let checked
        switch (color) {
            case "red":
                param = "redball[" + index + "].checked"
                checked = that.data.redball[index].checked
                break
            case "blue":
                param = "blueball[" + index + "].checked"
                checked = that.data.blueball[index].checked
                break
        }
        that.setData({
            [param]: !checked
        })
    },

    //校验玩法规则
    validData: function(color, select) {
        let that = this
        let maxRedNum = 6
        let maxBlueNum = 1
        let redNum = (color == "red" && !select) ? 1 : 0
        let buleNum = (color == "blue" && !select) ? 1 : 0
        redNum += that.getBall(that.data.redball).length
        if (redNum > maxRedNum) {
            return false
        }
        buleNum += that.getBall(that.data.blueball).length
        if (buleNum > maxBlueNum) {
            return false
        }
        return true
    },

    sends: function() {
        let that = this
        let reds = that.getBall(that.data.redball)
        if (reds.length != 6) {
            wx.showModal({
                title: '请选择6个红球',
                showCancel: false
            })
            return
        }
        let blues = that.getBall(that.data.blueball)
        if (blues.length != 1) {
            wx.showModal({
                title: '请选择1个篮球',
                showCancel: false
            })
            return
        }
        let box = {
            reds: reds,
            blues: blues
        }
        that.data.ballbox.push(box)
        that.setData({
            ballbox: that.data.ballbox
        })
        that.reset()
    },


    //获取数组中的球
    getBall: function(arr) {
        let array = []
        for (let i in arr) {
            if (arr[i].checked) {
                array.push(arr[i].num)
            }
        }
        return array
    },


    reset: function() {
        let that = this
        let red = wfc.getBallArray(33);
        let bule = wfc.getBallArray(16);
        that.setData({
            redball: red,
            blueball: bule
        })
    },

    clean: function() {
        let that = this
        that.setData({
            ballbox: []
        })
    },

    random: function(e) {
        let that = this
        let count = e.currentTarget.dataset.num
        let result = []
        for (let i = 0; i < count; i ++) {
            let a = that.data.redball.slice(0)
            let b = that.data.blueball.slice(0)
            let box = {
                reds: [],
                blues: []
            }
            //选出6个红球
            for (let i = 0; i < 6; i++) {
                let index = Math.floor(Math.random() * a.length);
                box.reds.push(a.splice(index, 1)[0].num)
            }
            let index = Math.floor(Math.random() * b.length);
            box.blues.push(b.splice(index, 1)[0].num)
            box.reds.sort()
            result.push(box)
        }
        that.setData({
            ballbox: that.data.ballbox.concat(result)
        })
        that.count()
    },
    //计算总数
    count: function() {
        let that = this
        let value = that.data.ballbox.length * 2 * that.data.count
        that.setData({
            value: value
        })
    },

    //事件处理函数
    /*点击减号*/
    bindMinus: function (e) {
        let that = this
        var num = this.data.count;
        if (num > 1) {
            num--;
        }
        var minusStat = num > 1 ? true : false;
        that.setData({
            count: num,
            minusStatus: minusStat
        }, () => {
            that.count()
        })
    },
    /*点击加号*/
    bindPlus: function (e) {
        let that = this
        var num = this.data.count;
        num++;
        var minusStat = num > 1 ? true : false;
        that.setData({
            count: num,
            minusStatus: minusStat
        }, () => {
            that.count()
        })
    },


})