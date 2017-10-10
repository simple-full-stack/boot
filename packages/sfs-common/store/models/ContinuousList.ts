import Base from './Base';
import { RequestParams } from './types';
import { assign } from 'lodash';

interface ResponseResult {
    list: any[];
    pageInfo: {
        startFlag?: any;
        endFlag?: any;
    }
}

export enum LoadingStatus {
    QUIET = 'QUIET',
    UP = 'UP',
    DOWN = 'DOWN'
}

export default abstract class ContinuousList extends Base {
    private isStarted = false;
    private params: RequestParams = null;

    protected getDefaultState() {
        return {
            list: [],
            pageInfo: {
                // 加载状态：QUIET -> 未加载；UP -> 向上加载；DOWN -> 向下加载
                loadingStatus: LoadingStatus.QUIET,
                // list 的开始标志
                startFlag: null,
                // list 的结束标志
                endFlag: null
            }
        };
    }

    protected abstract getRequester(): (params: RequestParams) => Promise<ResponseResult>;

    start(params: RequestParams) {
        if (this.isStarted) {
            throw new Error('has already started!');
        }

        this.params = params;
        this.isStarted = true;
    }

    stop() {
        this.reset();
        this.params = null;
        this.isStarted = false;
    }

    async append(offset: number): Promise<ResponseResult> {
        if (!this.isStarted) {
            throw new Error('not started!')
        }

        this.set('pageInfo.loadingStatus', LoadingStatus.DOWN);

        const params = assign({}, this.params, { offset, endFlag: this.get('pageInfo.endFlag', '') });
        const result = await this.getRequester()(params);

        this.set({
            'list': result.list,
            'pageInfo.endFlag': result.pageInfo.endFlag,
            'pageInfo.loadingStatus': LoadingStatus.QUIET
        });

        return result;
    }

    async prepend(offset: number): Promise<ResponseResult> {
        if (!this.isStarted) {
            throw new Error('not started!')
        }

        this.set('pageInfo.loadingStatus', LoadingStatus.UP);

        const params = assign({}, this.params, { offset, startFlag: this.get('pageInfo.startFlag', '') });
        const result = await this.getRequester()(params);

        this.set({
            'list': result.list,
            'pageInfo.startFlag': result.pageInfo.startFlag,
            'pageInfo.loadingStatus': LoadingStatus.QUIET
        });

        return result;
    }
}
