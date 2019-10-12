import {
    HTTP
} from '../utils/http-p';

export class Book extends HTTP {
    getHotList() {
        return this.request({
            url: '/book/hot_list'
        });
    }
}