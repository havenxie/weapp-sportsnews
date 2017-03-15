const newsdata = require('../../libraries/newsdata.js');
const dealUrl = require('../../libraries/dealUrl.js');

Page({
    data: {
        swiper: {},
        special: {},
        news: {},
        loading: true,
        hasMore: true,
        subtitle: ''
    },
    /**
     * [initLoad 初始化加载数据]
     * @return {[type]} [description]
     */
    initLoad() {
        this.setData({
            subtitle: '加载中...',
            loading: true
        })
        newsdata.find('ClientNews', {id: 'TY43,FOCUSTY43,TYTOPIC', page: 1})
        .then(d => {
            d.forEach((obj, index) => {
                let validData = obj.item;
                if(!validData) 
                    return;
                let typeData = obj.type;
                if (typeData == 'focus') {  //首页轮播图
                    validData.forEach((item, index) => {  //过滤web数据
                        if(item.type == 'web') {
                            validData.splice(index, 1);
                        }
                    });
                    obj.item = validData;
                    this.setData({
                        swiper: obj,
                        loading: false
                    });
                } else if (typeData == 'tytopic') {//首页专题导航
                    this.setData({
                        special: obj,
                        loading: false
                    });
                } else if (typeData == 'list') {//首页新闻列表
                    this.setData({
                        news: obj,
                        loading: false
                    });
                }
            })
        })
        .catch(e => {
            console.error(e)
            this.setData({
                movies: [],
                loading: false
            })
        })
    },

    /**
     * [loadMore 加载更多数据]
     * @return {[type]} [description]
     */
    loadMore() {
        let currentPage = this.data.news.currentPage;
        if (currentPage >= this.data.news.totalPage) {
            this.setData({
                hasMore: false,
                loading: false
            });
            return;
        }
        this.setData({
            subtitle: '加载中...',
            loading: true
        })
        
        newsdata.find('ClientNews', {id: 'TY43', page: ++currentPage})
            .then(d => {
                let newnews = d[0];

                let olditem = this.data.news.item;
                newnews.item = olditem.concat(newnews.item);
                this.setData({
                    news: newnews,
                    loading: false
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
    navToSpecial(event) {
        let str = dealUrl.getUrlTypeId(event);
        wx.navigateTo({
            url: '../special-page/special-page' + str,
            success: (res) => {},
            fail: (err) => {console.log(err)}
        });
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
    navToVideo(event) {
        // let str = dealUrl.getUrlTypeId(event);
        console.log(event.currentTarget.dataset.id);
        wx.navigateTo({
            url: '../video-page/video-page' + str,
            success: (res) => {},
            fail: (err) => {console.log(err)}
        });
    },
    
    /**
     * [onLoad 载入页面时执行的生命周期初始函数]
     * @return {[type]} [description]
     */
    onLoad() {
       this.initLoad();
    },

    /**
     * [onPullDownRefresh 下拉刷新数据]
     * @return {[type]} [description]
     */
    onPullDownRefresh() {
        this.initLoad();
        wx.stopPullDownRefresh();
    },

    /**
     * [onReachBottom 上拉加载更多]
     * @return {[type]} [description]
     */
    onReachBottom() {
        this.loadMore();
    }
})