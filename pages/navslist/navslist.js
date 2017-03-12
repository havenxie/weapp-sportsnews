const newsdata = require('../../libraries/newsdata.js');
Page({
    data: {
    	content: {},//存放说明、分享链接等信息
    	subjects: {},//主体内容，这里将他分为几个部分
    	head: {},
        loading: true,
        hasMore: true,


    },
    onLoad(params) {
    	newsdata.find('TopicApiForCmpp', params)
            .then(d => {
            	this.setData({
            		content: d.body.content,
            		subjects: d.body.subjects,
            		head: d.body.head,
                    loading: false,
                    hasMore: false
            	});
            	console.log(this.data.content);
            	console.log(this.data.subjects);
            	console.log(this.data.head);
            })
            .catch(e => {
                this.setData({
                    subtitle: '获取数据异常',
                    loading: false
                })
                console.error(e)
            })
    },
})