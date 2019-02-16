const newsdata = require('newsdata.js');

module.exports = {
    getUrlTypeId(option) {
        let url = option.currentTarget.dataset.id;//注意这里是小写
        //console.log(url)
        let apiLength = (url.indexOf(newsdata.API_URL) != -1) ? newsdata.API_URL.length : newsdata.API_URL2.length;
        if(url.indexOf('https') == -1) {//是http而不是https
            apiLength--;
        }
        let indexOfType = url.indexOf('?');
        let indexOfId = url.indexOf('&');
        let urlType = url.substr(apiLength + 1, indexOfType - apiLength - 1);
        let urlId = ''
        if (urlType == 'TopicApiForCmpp') {
            urlId = url.substr(indexOfType + 1);
        }
        else {
            urlId = url.substr(indexOfType + 1, indexOfId - indexOfType - 1);  
        }
        // console.log(urlType);
        // console.log(urlId);
        //console.log('?urlType=' + urlType + '&' + urlId)
        return '?urlType=' + urlType + '&' + urlId;
    },
    getUrlTypeId_bkp(option) {
        let url = option.currentTarget.dataset.id;//注意这里是小写
        console.log(url)
        let apiLength = (url.indexOf(newsdata.API_URL) != -1) ? newsdata.API_URL.length : newsdata.API_URL2.length;
        if (url.indexOf('https') == -1) {//是http而不是https
            apiLength--;
        }
        let indexOfId = url.indexOf('?');
        let urlId = url.substr(indexOfId + 1);
        let urlType = url.substr(apiLength + 1, indexOfId - apiLength - 1);
        // console.log(urlId);
        // console.log(urlType);
        console.log('?urlType=' + urlType + '&' + urlId)
        return '?urlType=' + urlType + '&' + urlId;
    },
}