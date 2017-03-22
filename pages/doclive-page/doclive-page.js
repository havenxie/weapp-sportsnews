const newsdata = require('../../libraries/newsdata.js');
Page({
	data: {
		title: '',
    	loading: true,
		item: {//这样写为了兼容
		},
		localParams: '',
		lives: [],
	},
	refeshInit(params) {
		let option = JSON.parse(params.option);
		let data = {};
		data.sportsLiveExt = option;
		this.setData({
			item: data,
			loading: false
		});        
    },
    refeshLive(params) {
    	//http://sports.live.ifeng.com/API/  LiveAPI.php?matchid=5261
    	 newsdata.findLive('LiveAPI.php', {
                matchid: 5261
            })
            .then(d => {
     			this.setData({
                    lives: d,
                    loading: false
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
    refeshChat(params) {

    },
    refeshNews(params) {

    },
	onLoad(params) {
		this.setData({//存储数据留着给刷新用
            localParams: params,
        });
		this.refeshInit(params);
		this.refeshLive();
	},
	 onPullDownRefresh() {
        this.refeshInit(this.data.localParams);
        this.refeshLive();
        wx.stopPullDownRefresh();
    },
});