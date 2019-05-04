var app = getApp()
Page( {
  data: {
    "ssqList": [{"lotteryIissue":"2019110","lotteryDate":"2019-04-27","red1":"6","red2":"1","red3":"2"},{"lotteryIissue":"2019109","lotteryDate":"2019-04-26","red1":"1","red2":"3","red3":"6"},{"lotteryIissue":"2019108","lotteryDate":"2019-04-25","red1":"5","red2":"1","red3":"5"},{"lotteryIissue":"2019107","lotteryDate":"2019-04-24","red1":"1","red2":"7","red3":"7"},{"lotteryIissue":"2019106","lotteryDate":"2019-04-23","red1":"0","red2":"4","red3":"0"},{"lotteryIissue":"2019105","lotteryDate":"2019-04-22","red1":"3","red2":"8","red3":"2"},{"lotteryIissue":"2019104","lotteryDate":"2019-04-21","red1":"5","red2":"9","red3":"3"},{"lotteryIissue":"2019103","lotteryDate":"2019-04-20","red1":"7","red2":"5","red3":"0"},{"lotteryIissue":"2019102","lotteryDate":"2019-04-19","red1":"5","red2":"5","red3":"9"},{"lotteryIissue":"2019101","lotteryDate":"2019-04-18","red1":"5","red2":"5","red3":"9"},{"lotteryIissue":"2019100","lotteryDate":"2019-04-17","red1":"4","red2":"8","red3":"7"},{"lotteryIissue":"2019099","lotteryDate":"2019-04-16","red1":"7","red2":"3","red3":"8"},{"lotteryIissue":"2019098","lotteryDate":"2019-04-15","red1":"0","red2":"8","red3":"7"},{"lotteryIissue":"2019097","lotteryDate":"2019-04-14","red1":"2","red2":"4","red3":"3"},{"lotteryIissue":"2019096","lotteryDate":"2019-04-13","red1":"0","red2":"6","red3":"6"},{"lotteryIissue":"2019095","lotteryDate":"2019-04-12","red1":"9","red2":"3","red3":"5"},{"lotteryIissue":"2019094","lotteryDate":"2019-04-11","red1":"8","red2":"9","red3":"1"},{"lotteryIissue":"2019093","lotteryDate":"2019-04-10","red1":"2","red2":"5","red3":"8"},{"lotteryIissue":"2019092","lotteryDate":"2019-04-09","red1":"6","red2":"3","red3":"0"},{"lotteryIissue":"2019091","lotteryDate":"2019-04-08","red1":"5","red2":"2","red3":"6"},{"lotteryIissue":"2019090","lotteryDate":"2019-04-07","red1":"7","red2":"8","red3":"9"},{"lotteryIissue":"2019089","lotteryDate":"2019-04-06","red1":"4","red2":"5","red3":"0"},{"lotteryIissue":"2019088","lotteryDate":"2019-04-05","red1":"9","red2":"3","red3":"6"},{"lotteryIissue":"2019087","lotteryDate":"2019-04-04","red1":"1","red2":"7","red3":"4"},{"lotteryIissue":"2019086","lotteryDate":"2019-04-03","red1":"2","red2":"8","red3":"3"},{"lotteryIissue":"2019085","lotteryDate":"2019-04-02","red1":"5","red2":"0","red3":"5"},{"lotteryIissue":"2019084","lotteryDate":"2019-04-01","red1":"9","red2":"7","red3":"8"},{"lotteryIissue":"2019083","lotteryDate":"2019-03-31","red1":"9","red2":"8","red3":"2"
}
    ],
    animationNotice: {}
  },
  onReady: function() {

  },
  onLoad: function() {
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

    console.log( 'onLoad' );
  },
  startNotice: function() {
    var me = this;
    var notices = me.data.notices || [];
    if( notices.length == 0 ) {
      return;
    }

    var animation = me.animation;
    //animation.translateY( -12 ).opacity( 0 ).step();
    animation.translateY( 0 ).opacity( 1 ).step( { duration: 0 });
    me.setData( { animationNotice: animation.export() });

    var noticeIdx = me.data.noticeIdx + 1;
    if( noticeIdx == notices.length ) {
      noticeIdx = 0;
    }

    // 更换数据
    setTimeout( function() {
      me.setData( {
        noticeIdx: noticeIdx
      });
    }, 400 );

    // 启动下一次动画
    setTimeout( function() {
      me.startNotice();
    }, 5000 );
  },
  onShow: function() {
    this.startNotice();

  },
  onToTop: function( e ) {
    if( e.detail.scrollTop >= 290 ) {
      this.setData( { sortPanelPos: 'fixed' });
    } else {
      this.setData( { sortPanelPos: 'relative' });
    }
    console.log( e.detail.scrollTop )
  }
})
