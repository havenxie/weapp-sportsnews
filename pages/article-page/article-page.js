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

	onLoad(option) {
		 let params = option;
        let urlType = params.urlType;
        delete params.urlType; //返回的是一个bool值
		newsdata.find(urlType, params)
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