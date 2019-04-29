import req from '../../utils/request.js'
var app = getApp()
Page( {
  data: {
    imgUrls: [
      'http://www.kanfucai.com/giftImg/20150804150734201.jpg',
      'http://www.kanfucai.com/giftImg/20190416104702493.jpg',

      'https://onegoods.nosdn.127.net/resupload/2016/9/20/f2f210633ca371ea6dc56a4b8916a15d.jpg',
      'https://onegoods.nosdn.127.net/resupload/2016/9/21/33c38d5283a862b2523fe2e085355cb2.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    windowWidth: 320,
    sortPanelTop: '0',
    sortPanelDist: '290',
    sortPanelPos: 'relative',
    noticeIdx: 0,
    notices: [
      {
        "clickUrl": "dbjsbridge://go?module=detail&gid=1032&period=192",
        "goods": "兑换了 It’S SKIN 伊思 完美活肤逆时空晶钻蜗牛BB霜 50毫升",
        "name": "奥特曼",
        "time": "2分钟前"
      },
      {
        "clickUrl": "dbjsbridge://go?module=detail&gid=1122&period=646",
        "goods": "兑换了 1箱20盒 |五木 梅紫苏味乌冬面 109克",
        "name": "磊磊跳楼了",
        "time": "2分钟前"
      },
      {
        "clickUrl": "dbjsbridge://go?module=detail&gid=931&period=601",
        "goods": "兑换了  儿童脚踏三轮车",
        "name": "最后一次",
        "time": "2分钟前"
      }
    ],
    goodsList: [],
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

    req.get('/wx/index.htm').then((res)=>{
        console.log(res)
        me.setData({
            goodsList: res.data.gift
        })
    })
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
