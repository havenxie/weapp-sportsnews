const API_URL = 'http://api.iclient.ifeng.com';
const Promise = require('./bluebird')

function fetchApi (type, params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${API_URL}/${type}`,
      data: Object.assign({}, params),
      header: { 'Content-Type': 'json' },
      success: resolve,
      fail: reject
    })
  })
}

module.exports = {
  find (type, id, page) {
    const params = page ? {id: id, page: page} : {aid: id}
    return fetchApi(type, params)
      .then(res => res.data)
  },

  findOne (id) {
    return fetchApi('subject/' + id)
      .then(res => res.data)
  }
}

