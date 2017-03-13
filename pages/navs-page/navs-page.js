const newsdata = require('../../libraries/newsdata.js');
Page({
    data: {
    	content: {},//存放说明、分享链接等信息
    	subjects: {},//主体内容，这里将他分为几个部分
    	head: {},
        loading: true,
        hasMore: true,
        localParams: {}
    },

    loadData(params) {
        newsdata.find('TopicApiForCmpp', params)
        .then(d => {
            d.body.subjects.forEach((obj, index) => {
                if(obj.podItems && (obj.podItems.length > 0)) {
                    let indexOfId = 0;
                    // let urlId = '';
                    let urlType = '';
                    let docUrl = '';
                    obj.podItems.forEach((substance, index) => {
                        if(substance.style == 'doc') {
                        indexOfId = substance.links[0].url.indexOf('?');
                        // urlId = substance.links[0].url.substr(indexOfId + 1);
                        urlType = substance.links[0].url.substr(30, indexOfId - 30);
                        // substance.urlId = urlId;
                        substance.urlType = urlType;
                        }
                    });
                }
            });
            this.setData({
                content: d.body.content,
                subjects: d.body.subjects,
                head: d.body.head,
                loading: false,
                hasMore: false
            });
            // console.log(this.data.content);
            // console.log(this.data.subjects);
            // console.log(this.data.head);
        })
        .catch(e => {
            this.setData({
                subtitle: '获取数据异常',
                loading: false
            })
            console.error(e)
        })
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