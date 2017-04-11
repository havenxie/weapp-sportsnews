const newsdata = require('newsdata.js');

module.exports = {
  getUrlTypeId(option) {
        let url = option.currentTarget.dataset.id;//注意这里是小写
        let apiLength = (url.indexOf(newsdata.API_URL) != -1) ? newsdata.API_URL.length : newsdata.API_URL2.length;
        if(url.indexOf('https') == -1) {//是http而不是https
            apiLength--;
        }
        let indexOfId = url.indexOf('?');
        let urlId = url.substr(indexOfId + 1);
        let urlType = url.substr(apiLength + 1, indexOfId - apiLength -1);
        // console.log(urlId);
        // console.log(urlType);
        return '?urlType=' + urlType + '&' + urlId;
    },
}