/**
 * @file NetworkModule
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import BaseModule from './BaseModule';
export interface IAPIMap {
    [key: string]: string | ((config: AxiosRequestConfig) => AxiosPromise);
}
export declare type Requester = ((config: AxiosRequestConfig) => AxiosPromise);
export default abstract class NetworkModule extends BaseModule {
    static registerAPIs(apiConfig: {}): void;
    private static apis;
    /**
     * 包一层 axios.request：
     * https://github.com/mzabriskie/axios#request-config
     *
     * @protected
     * @param {Object} config 请求配置
     * @return {Promise}
     */
    private static request(config);
    protected apis: IAPIMap;
}
