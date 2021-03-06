import { AxiosPromise } from 'axios';

export const API_KEY: string = '__api__';

export interface IWindow {
    [key: string]: any;
}

export interface IAPIDescription {
    parameterCount: number;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
}

export interface IAPIConfig {
    [path: string]: IAPIDescription;
}

export interface IRequester {
    [fnName: string]: (...args: any[]) => AxiosPromise;
}

export interface IRequesters {
    [ns: string]: IRequester;
}
