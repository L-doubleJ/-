import {
    HTTP
} from '../utils/http';
export class ClassiModel extends HTTP {
    getLatest(callBack) {
        this.request({
            url: '/classic/latest',
            success: (res) => {
                callBack(res.data);
                this._setLatestIndex(res.data.index);
                let key = this._getKey(res.data.index);
                wx.setStorageSync(key, res.data);
            }
        });
    }

    getClassic(index, type, callback) {
        //缓存中寻找看看有没有 ，没有就请求并写入缓存
        let key = type == 'next' ? this._getKey(index + 1) : this._getKey(index - 1);
        let classic = wx.getStorageSync(key);
        if (!classic) {
            this.request({
                url: '/classic/' + index + '/' + type,
                success: (res) => {
                    wx.setStorageSync(this._getKey(res.data.index), res.data)
                    callback(res.data);
                }
            })
        } else {
            callback(classic);
        }
    }

    ifFirst(index) {
        return index == 1 ? true : false
    }
    isLatest(index) {
        let latestIndex = this._getLatestIndex();
        return latestIndex == index ? true : false;
    }
    //存储index到storage
    _setLatestIndex(index) {
        wx.setStorageSync('latest', index);
    }
    //拿storage里面的index
    _getLatestIndex() {
        let index = wx.getStorageSync('latest');
        return index;
    }
    _getKey(index) {
        let key = 'classic-' + index;
        return key;
    }
}