const newsdata = require('../../libraries/newsdata.js');

Page({
    data: {
        swiper: {},
        navs: {},
        news: {},
        loading: true,
        hasMore: true,
    },

    /**
     * [initLoad 初始化加载数据]
     * @return {[type]} [description]
     */
    initLoad() {
        newsdata.find('ClientNews', {id: 'TY43,FOCUSTY43,TYTOPIC', page: 1})
            .then(d => {
                d.forEach((obj, index) => {
                    let type = obj.type;
                    if (type == 'focus') {
                        this.setData({
                            swiper: obj,
                            loading: false
                        });
                    } else if (type == 'tytopic') {
                        let staticId = '';
                        let shortId = '';
                        obj.item.forEach((val, index) => {
                            staticId = val.staticId;
                            shortId = staticId.slice(staticId.indexOf('=') + 1);
                            val.staticId = shortId;
                        });
                        this.setData({
                            navs: obj,
                            loading: false
                        });
                    } else if (type == 'list') {
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
     * [onLoad 载入页面时执行的生命周期初始函数]
     * @return {[type]} [description]
     */
    onLoad() {
       this.initLoad();
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

    /**
     * [onPullDownRefresh 下拉刷新数据]
     * @return {[type]} [description]
     */
    onPullDownRefresh() {
        this.initLoad();
        wx.stopPullDownRefresh();
    },
})