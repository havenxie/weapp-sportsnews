const newsdata = require('../../libraries/newsdata.js');
Page({
	data: {
		title: '',
		slides: [],
    	loading: true,
    	hiddenInfo: false
	},
	onLoad(params) {
		let aid = params.id;
		let checkStr = 'news_article';
		let checkStr2 = 'news_slide';
		if(aid.indexOf(checkStr) >= 0) {
			aid ='cmpp' + aid.substr(checkStr.length);
		} else if(aid.indexOf(checkStr2) >= 0) {
			aid = 'cmpp' + aid.substr(checkStr2.length);
		}
		console.log(params.urltype)
		console.log(aid)
		newsdata.find(params.urltype, {aid: aid})
			.then((res) => {
				if(res.meta && (res.meta.type == 'slides')) {
					if(res.body && res.body.slides.length > 0) {
						this.setData({
							slides: res.body.slides,
							title: res.body.title,
							loading: false
						});
					}
				}
			})
			.catch(err => {
				this.setData({ title: '获取数据异常', loading: false })
				console.log(err);
			})

	},
	tapSwiper() {
		this.setData({
			hiddenInfo: !this.data.hiddenInfo
		});
	},
	onPullDownRefresh() {
        wx.stopPullDownRefresh();
    },
})