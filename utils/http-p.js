import {
    config
} from '../config.js'

// # 解构
export class HTTP {
    request({
        url,
        data,
        method
    }) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method)
        })
    }
    _request(url, resolve, reject, data = {}, method = 'GET') {
        wx.request({
            url: config.api_base_url + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                resolve(res);
            },
            fail: (err) => {
                reject();
            }
        })
    }
}