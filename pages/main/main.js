var mTitles = [];
var mSrcs = [];
var mTimes = [];
var mCurrentPage = -1;

Page( {
    data: {
        // text:"这是一个页面"
        items: [],
        hidden: false
    },
    onLoad: function( options ) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        requestData( that, mCurrentPage + 1 )
    },

    onItemClick: function( event ) {
        var targetUrl = Constant.PAGE_SPECIFIC;
        if( event.currentTarget.dataset.publishTime != null )
            targetUrl = targetUrl + "?publishTime=" + event.currentTarget.dataset.publishTime;
        console.log( "onClick_PAGE_SPECIFIC" );
        wx.navigateTo( {
            url: targetUrl
        });
    },

    onPostClick: function( event ) {
        console.log( "onPostClick" );
        wx.navigateTo( {
            url: Constant.PAGE_POST
        });
    },

    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
});
/**
 * 请求数据
 */
function requestData( that, targetPage ) {
    wx.request( {
        url: Constant.GET_URL.replace( "(/\(\d+))$", targetPage ),
        data: {
          x: '',
          y: ''
        },
        header: {
            "Content-Type": "application/json"
        },
        success: function( res ) {
            if( res == null ||
                res.data == null ||
                res.data.results == null ||
                res.data.results.length <= 0
            ) {
                console.error( Constant.ERROR_DATA_IS_NULL );
                return;
            }
            var i = 0;
            for( ;i < res.data.results.length;i++ )
                bindData( res.data.results[ i ] );
            //将获取的各种数据写入itemListList,用于setDataData
            var itemList = [];
            for( var i = 0;i < mTitles.length;i++ )
                itemList.push( { title: mTitles[ i ], src: mSrcs[ i ], time: mTimes[ i ] });


            that.setData( {
                items: itemList,
                hidden: true
            });


            mCurrentPage = targetPage;
        }
    });
}

/**
 * 绑定数据
 */
function bindData( itemData ) {
    var re = new RegExp( "[a-zA-z]+://w{2}[^\"]*" );
    var title = itemData.content.match( re )[ 0 ];

    var src = title.replace( "//ww", "//ws" );

    mTitles.push( itemData.title );
    mTimes.push( itemData.publishedAt.split( "T" )[ 0 ] );
    mSrcs.push( src );
}

var Constant = require( '../../utils/constant.js' );