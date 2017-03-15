const newsdata = require('../../libraries/newsdata.js');
const dealUrl = require('../../libraries/dealUrl.js');
Page({
    data: {
    	content: {},//存放说明、分享链接等信息
    	subjects: {},//主体内容，这里将他分为几个部分
    	head: {},
        loading: true,
        hasMore: true,
        localParams: {}
    },

    loadData(option) {
        let params = option;
        let urlType = params.urlType;
        delete params.urlType; //返回的是一个bool值
        this.setData({
            subtitle: '加载中...',
            loading: true
        })
        newsdata.find(urlType, params)
        .then(d => {
            this.setData({
                content: d.body.content,
                subjects: d.body.subjects,
                head: d.body.head,
                loading: false,
                hasMore: false
            });
        })
        .catch(e => {
            this.setData({
                subtitle: '获取数据异常',
                loading: false
            })
            console.error(e)
        })
    },
    navToPicture(event) {
        let str = dealUrl.getUrlTypeId(event);
            wx.navigateTo({
            url: '../picture-page/picture-page' + str,
            success: (res) => {},
            fail: (err) => {console.log(err)}
        });
    },
    navToArticle(event) {
        let str = dealUrl.getUrlTypeId(event);
        wx.navigateTo({
            url: '../article-page/article-page' + str,
            success: (res) => {},
            fail: (err) => {console.log(err)}
        });
    },
    navToVideo(event) {
        let str = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: '../video-page/video-page?videoUrl=' + str,
            success: (res) => {},
            fail: (err) => {console.log(err)}
        });
    },

    onLoad(params) {
        this.setData({
            localParams: params,
        });
        this.loadData(this.data.localParams);
    },
    onPullDownRefresh() {
        this.loadData(this.data.localParams);
        wx.stopPullDownRefresh();
    },
})