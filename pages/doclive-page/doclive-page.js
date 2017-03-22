Page({
	data: {
		title: '',
    	loading: true,
		item: {//这样写为了兼容
		},
		localParams: '',
	},
	refesh(params) {
		let option = JSON.parse(params.option);
		let data = {};
		data.sportsLiveExt = option;
		this.setData({
			item: data,
			loading: false
		});        
    },
	onLoad(params) {
		this.setData({//存储数据留着给刷新用
            localParams: params,
        });
		this.refesh(params);
	},
	 onPullDownRefresh() {
        this.refesh(this.data.localParams);
        wx.stopPullDownRefresh();
    },
});