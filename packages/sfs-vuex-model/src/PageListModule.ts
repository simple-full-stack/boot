/**
 * @file constants
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import action from './decorators/action';
import NetworkModule from './NetworkModule';
import { AxiosRequestConfig } from 'axios';

export interface IPageInfo {
    pageNo?: number;
    pageSize?: number;
    pageSizes?: number[];
    totalCount?: number;
    isLoading?: boolean;
}

export interface IResponse {
    list: Array<{}>;
    pageInfo: IPageInfo;
}

export interface IState extends Record<string, {}> {
    list: Array<{}>;
    pageInfo: IPageInfo;
}

export default abstract class PageListModule extends NetworkModule {

    public state: IState = {
        list: [],
        pageInfo: {
            pageNo: 1,
            pageSize: 30,
            pageSizes: [30, 50, 100],
            totalCount: 0,
            isLoading: false,
        },
    };

    @action
    public async requestList(config: AxiosRequestConfig): Promise<void> {
        const api: (p: AxiosRequestConfig) => Promise<{}> = this.getAPI();
        try {
            this.updatePageInfo({ isLoading: false });
            const result: {} = await api(this.formatRequest(config));
            const { pageInfo, list }: { pageInfo: IPageInfo; list: Array<{}>; } = this.formatResponse(result);
            this.updatePageInfo(pageInfo);
            this.updateList(list);
        } catch (e) {
            throw e;
        } finally {
            this.updatePageInfo({ isLoading: false });
        }
    }

    // 在 PageView beforeDestroy 的时候调用，主要用于清理数据
    @action
    /* tslint:disable:no-empty */
    public leave(): void {}
    /* tslint:enable:no-empty */

    protected abstract getAPIName(): string;

    protected formatResponse(response: {}): IResponse {
        return response as IResponse;
    }

    protected formatRequest(config: AxiosRequestConfig): AxiosRequestConfig {
        return config;
    }

    private updatePageInfo(pageInfo: IPageInfo): void {
        this.updateState('pageInfo', { ...this.state.pageInfo, ...pageInfo });
    }

    private updateList(list: Array<{}>): void {
        this.updateState('list', list);
    }

    private getAPI(): (config: AxiosRequestConfig) => Promise<{}> {
        const api: {} = this.apis[this.getAPIName()];
        if (typeof api === 'string') {
            throw new TypeError(`The api: ${api} is string type`);
        }

        return api as ((config: AxiosRequestConfig) => Promise<{}>);
    }
}
