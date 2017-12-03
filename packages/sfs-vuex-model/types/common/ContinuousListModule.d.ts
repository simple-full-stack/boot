import NetworkModule from './NetworkModule';
import { AxiosRequestConfig } from 'axios';
export declare enum LoadingStatus {
    QUIET = 0,
    UP = 1,
    DOWN = 2,
}
export interface IPageInfo {
    loadingStatus?: LoadingStatus;
    startFlag?: {};
    endFlag?: {};
}
export interface IResponse {
    list: {}[];
    pageInfo: IPageInfo;
}
export interface IState extends Record<string, {}> {
    list: {}[];
    pageInfo: IPageInfo;
}
export default abstract class ContinuousListModule extends NetworkModule {
    /**
     * @override
     */
    state: IState;
    requestAppend(config: AxiosRequestConfig): Promise<void>;
    requestPrepend(config: AxiosRequestConfig): Promise<void>;
    protected abstract getAPIName(): string;
    protected formatResponse(response: {}, _: 'append' | 'prepend'): IResponse;
    protected formatRequest(config: AxiosRequestConfig, _: 'append' | 'prepend'): AxiosRequestConfig;
    private updatePageInfo(pageInfo);
    private updateList(list, typ);
    private getAPI(api?);
}
