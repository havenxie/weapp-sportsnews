const newsdata = require('../../libraries/newsdata.js');
const htmlToWxml = require('../../libraries/htmlToWxml.js');
Page({
	data: {
		title: '',
    	loading: true,
		body: {},
		disclaimer: '',
		wxml: {}
	},

	onLoad(params) {
		let aid = params.id;
		let checkStr = 'news_article';
		if(aid.indexOf(checkStr) >= 0) {
			aid ='cmpp' + aid.substr(checkStr.length);
		}
		console.log(params.urltype)
		console.log(aid)
		newsdata.find(params.urltype, {aid: aid})
			.then((res) => {
				console.log(res);
				let wxml = htmlToWxml.html2json(res.body.text);
				this.setData({wxml: wxml});

				this.setData({
					loading: false,
					body: res.body,
					disclaimer: res.disclaimer
				});

			})
			.catch(err => {
				this.setData({ title: '获取数据异常', loading: false })
				console.log(err);
			})
	},
	 /**
     * [onPullDownRefresh 下拉页面不做处理]
     * @return {[type]} [description]
     */
    onPullDownRefresh() {
        wx.stopPullDownRefresh();
    },
})