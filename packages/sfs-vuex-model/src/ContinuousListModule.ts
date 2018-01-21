/**
 * @file ContinuousListModule
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import action from './decorators/action';
import NetworkModule from './NetworkModule';
import { AxiosRequestConfig } from 'axios';
import { Requester } from './NetworkModule';

export enum LoadingStatus { QUIET, UP, DOWN }

export interface IPageInfo {
    loadingStatus?: LoadingStatus;
    startFlag?: {};
    endFlag?: {};
}

export interface IResponse {
    list: Array<{}>;
    pageInfo: IPageInfo;
}

export interface IState extends Record<string, {}> {
    list: Array<{}>;
    pageInfo: IPageInfo;
}

export default abstract class ContinuousListModule extends NetworkModule {

    /**
     * @override
     */
    public state: IState = {
        list: [],
        pageInfo: {
            // 加载状态：QUIET -> 未加载；UP -> 向上加载；DOWN -> 向下加载
            loadingStatus: LoadingStatus.QUIET,
            // list 的开始标志
            startFlag: undefined,
            // list 的结束标志
            endFlag: undefined,
        },
    };

    @action
    public async requestAppend(config: AxiosRequestConfig): Promise<void> {
        const api: Requester = this.getAPI() as Requester;
        try {
            this.updatePageInfo({ loadingStatus: LoadingStatus.DOWN });
            const result: {} = await api(this.formatRequest(config, 'append'));
            const { list, pageInfo }: IResponse = this.formatResponse(result, 'append');
            this.updateList(list, 'append');
            this.updatePageInfo(pageInfo);
        } catch (e) {
            throw e;
        } finally {
            this.updatePageInfo({ loadingStatus: LoadingStatus.QUIET });
        }
    }

    @action
    public async requestPrepend(config: AxiosRequestConfig): Promise<void> {
        const api: Requester = this.getAPI() as Requester;
        try {
            this.updatePageInfo({ loadingStatus: LoadingStatus.UP });
            const result: {} = await api(this.formatRequest(config, 'prepend'));
            const { list, pageInfo }: IResponse = this.formatResponse(result, 'prepend');
            this.updateList([...list, ...this.state.list], 'prepend');
            this.updatePageInfo(pageInfo);
        } catch (e) {
            throw e;
        } finally {
            this.updatePageInfo({ loadingStatus: LoadingStatus.QUIET });
        }
    }

    protected abstract getAPIName(): string;

    protected formatResponse(response: {}, _: 'append' | 'prepend'): IResponse {
        return response as IResponse;
    }

    protected formatRequest(config: AxiosRequestConfig, _: 'append' | 'prepend'): AxiosRequestConfig {
        return config;
    }

    private updatePageInfo(pageInfo: IPageInfo): void {
        this.updateState('pageInfo', { ...this.state.pageInfo, ...pageInfo });
    }

    private updateList(list: Array<{}>, typ: 'prepend' | 'append'): void {
        this.updateState(
            'list',
            typ === 'append'
                ? [...this.state.list, ...list]
                : [...list, ...this.state.list],
        );
    }

    private getAPI(api?: string): Requester {
        api = api || this.getAPIName();
        const requester: Requester | string = this.apis[api];
        if (typeof requester === 'string') {
            throw new TypeError(`The api: ${api} is string type`);
        }

        return requester;
    }
}
