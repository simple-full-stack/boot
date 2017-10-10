import Base from './Base';
import { cloneDeep, assign } from 'lodash';
import { RequestParams } from './types';

interface ResponseResult {
    list: any[];
    pageInfo: {
        pageNo: number;
        pageSize: number;
        totalCount: number;
    }
}

export default abstract class PageList extends Base {
    private isStarted = false;
    private params: RequestParams = null;

    protected abstract getRequester(): (params: RequestParams) => Promise<ResponseResult>;

    protected getDefaultState() {
        return {
            list: [],
            pageInfo: {
                pageNo: 0,
                pageSize: 30,
                pageSizes: [30, 50, 100],
                totalCount: 0,
                isLoading: false
            }
        };
    }

    protected getInitialState() {
        return {};
    }

    start(params: RequestParams) {
        if (this.isStarted) {
            throw new Error('has already started!');
        }

        this.params = params;
        this.isStarted = true;
    }

    async request(pageNo: number = (this.get('pageInfo.pageNo', 0) + 1)): Promise<ResponseResult> {
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
        this.reset();
        this.params = null;
        this.isStarted = false;
    }
}
