const newsdata = require('newsdata.js');

module.exports = {
  getUrlTypeId(option) {
        let url = option.currentTarget.dataset.id;//注意这里是小写
        let indexOfId = url.indexOf('?');
        let urlId = url.substr(indexOfId + 1);
        let urlType = url.substr(newsdata.API_URL.length + 1, indexOfId - newsdata.API_URL.length -1);
        // console.log(urlId);
        // console.log(urlType);
        return '?urlType=' + urlType + '&' + urlId;
    },
}