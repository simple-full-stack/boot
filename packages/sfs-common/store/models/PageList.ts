import Base from './Base';
import { cloneDeep, assign } from 'lodash';

interface RequestParams {
    [key: string]: string
}

interface ResponseResult {
    list: any[];
    pageInfo: {
        pageNo: number;
        pageSize: number;
        totalCount: number;
    }
}

export default class PageList extends Base {
    protected defaultState = {
        list: [],
        pageInfo: {
            pageNo: 0,
            pageSize: 30,
            pageSizes: [30, 50, 100],
            totalCount: 0,
            isLoading: false
        }
    };

    state = cloneDeep(this.defaultState);

    private isStarted = false;
    private params: RequestParams = null;

    getRequester(): (params: RequestParams) => Promise<ResponseResult> {
        throw new Error('must be implemented!');
    }

    start(params: RequestParams) {
        if (this.isStarted) {
            throw new Error('has already started!');
        }

        this.params = params;
        this.isStarted = true;
    }

    async request(pageNo: number = (this.state.pageInfo.pageNo || 0) + 1): Promise<ResponseResult> {
        if (!this.isStarted) {
            throw new Error('not started!')
        }

        this.set('pageInfo.isLoading', true);
        const params = assign({}, this.params, { pageNo });
        const result = await this.getRequester()(params);
        this.set({
            'list': result.list,
            'pageInfo.pageNo': result.pageInfo.pageNo,
            'pageInfo.pageSize': result.pageInfo.pageSize,
            'pageInfo.totalCount': result.pageInfo.totalCount
        });
        this.set('pageInfo.isLoading', false);

        return result;
    }

    stop() {
        this.clear();
        this.params = null;
        this.isStarted = false;
    }

    clear() {
        this.state = cloneDeep(this.defaultState);
    }
}
