const newsdata = require('../../libraries/newsdata.js');
const htmlToWxml = require('../../libraries/htmlToWxml.js');
Page({
	data: {
		title: '',
    	loading: true,
		status: '',
		online: 1,
		channelInfo: {},
		body: {},
		disclaimer: '',
		wxml: {}
	},

	onLoad(params) {
		newsdata.find('api_vampire_article_detail', params.id, null)
			.then((res) => {
				// console.log(res);
				this.setData({
					loading: false,
					status: res.status,
					online: res.online,
					channelInfo: res.channelInfo,
					body: res.body,
					disclaimer: res.disclaimer
				});
				let wxml = htmlToWxml.html2json(this.data.body.text);
				this.setData({wxml: wxml});
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