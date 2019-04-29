var app = getApp()
Page( {
  
  data:{
    sortPanelDist: '290',
  },

  onLoad: function(options) {
    var me = this;
    var animation = wx.createAnimation( {
      duration: 400,
      timingFunction: 'ease-out',
    });
    me.animation = animation;
    wx.getSystemInfo( {
      success: function( res ) {
        me.setData( { windowWidth: res.windowWidth })
      }
    });
    let index = options.index

    let pages = getCurrentPages();
    let Page = pages[pages.length - 1];//当前页
    let prevPage = pages[pages.length - 2];  //上一个页面
    let info = prevPage.data.newsList[index] //取上页data里的数据也可以修改

    me.setData({
        info: info
    })    
  },
})
