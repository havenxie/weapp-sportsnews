const newsdata = require('../../libraries/newsdata.js');
Page({
	data: {
		title: '',
		slides: [],
    loading: true,
    hiddenInfo: false
	},

	tapSwiper() {
		this.setData({
			hiddenInfo: !this.data.hiddenInfo
		});
	},

	onLoad(option) {
		let params = option;
        let urlType = params.urlType;
        delete params.urlType; //返回的是一个bool值
		newsdata.find(urlType, params)
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

	onPullDownRefresh() {
        wx.stopPullDownRefresh();
    },
})