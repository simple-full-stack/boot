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
    list: {}[];
    pageInfo: IPageInfo;
}
export interface IState extends Record<string, {}> {
    list: {}[];
    pageInfo: IPageInfo;
}
export default abstract class PageListModule extends NetworkModule {
    state: IState;
    requestList(config: AxiosRequestConfig): Promise<void>;
    leave(): void;
    protected abstract getAPIName(): string;
    protected formatResponse(response: {}): IResponse;
    protected formatRequest(config: AxiosRequestConfig): AxiosRequestConfig;
    private updatePageInfo(pageInfo);
    private updateList(list);
    private getAPI();
}
