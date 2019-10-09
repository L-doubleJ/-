import {
    config
} from '../config'

export class HTTP {
    request(params) {
        if (!params.method) {
            params.method = 'GET';
        }
        wx.request({
            url: config.api_base_url + params.url,
            methods: params.method,
            data: params.data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            success: (res) => {
                params.success(res);
            },
            fail: (err) => {
                wx.showToast({
                    title: '加载失败',
                    icon: 'none',
                    duration: 2000
                });
            }
        });

    }
}