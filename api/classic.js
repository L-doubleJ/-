import {
    HTTP
} from '../utils/http';

export class ClassicApi extends HTTP {
    getLatest(callBack) {
        this.request({
            url: '/classic/latest',
            success: (res) => {
                callBack(res.data);
            }
        });
    }
}