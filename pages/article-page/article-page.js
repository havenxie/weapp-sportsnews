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
	dingyue() {
		wx.showModal({
			title: '提示',
			content: '点击也没用，这个功能根本就没做',
			success: () => {},
			fail: () => {}
		});
	},
	 /**
     * [onPullDownRefresh 下拉页面不做处理]
     * @return {[type]} [description]
     */
    onPullDownRefresh() {
        wx.stopPullDownRefresh();
    },
})