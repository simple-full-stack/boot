/**
 * @file NetworkModule
 * @author yibuyisheng(yibuyisheng@163.com)
 */

import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { each, assign, isString, isObject } from 'lodash';
import BaseModule from './BaseModule';

interface IAPIMap {
    [key: string]: string | ((config: AxiosRequestConfig) => AxiosPromise);
}

export type Requester = ((config: AxiosRequestConfig) => AxiosPromise);

export default abstract class NetworkModule extends BaseModule {

    private static apis: IAPIMap = {};

    protected apis: IAPIMap = NetworkModule.apis;

    public static registerAPIs(apiConfig: {}): void {
        each(apiConfig, (urlStr: string, name: string) => {
            if (isString(urlStr)) {
                const [type, url]: string[] = urlStr.split('|');
                switch (type) {
                    case 'get':
                    case 'post':
                    case 'delete':
                    case 'head':
                    case 'options':
                    case 'put':
                    case 'patch':
                        this.apis[name] = (extraConfig: AxiosRequestConfig): AxiosPromise => {
                            const config: AxiosRequestConfig = {
                                method: type,
                                url,
                                ...extraConfig
                            };
                            return this.request(config);
                        };
                        break;
                    case 'raw':
                    default:
                        this.apis[name] = url;
                        break;
                }
            } else if (isObject(urlStr)) {
                this.apis[name] = (extraConfig: AxiosRequestConfig): AxiosPromise => {
                    const config: AxiosRequestConfig = assign({}, urlStr, extraConfig);
                    return this.request(config);
                };
            }
        });
    }

    /**
     * 包一层 axios.request：
     * https://github.com/mzabriskie/axios#request-config
     *
     * @protected
     * @param {Object} config 请求配置
     * @return {Promise}
     */
    private static request(config: AxiosRequestConfig): AxiosPromise {
        return axios.request(config);
    }
}
