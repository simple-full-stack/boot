import { camelCase, each } from 'lodash';
import axios, { AxiosPromise } from 'axios';

declare const API_KEY: string;

interface Window {
    [key: string]: any;
}

interface APIDescription {
    parameterCount: number;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

interface APIConfig {
    [path: string]: APIDescription;
}

interface Requester {
    [fnName: string]: (...args: Array<any>) => AxiosPromise;
}

interface Requesters {
    [ns: string]: Requester;
}

const apiConfig = (window as Window)[API_KEY] as APIConfig;

const requesters: Requesters = {};
each(apiConfig, (description, path) => {
    const [, , ns, fnName] = path.split('/');
    const nsCamel = camelCase(ns);
    requesters[nsCamel] = requesters[ns] || {};
    requesters[nsCamel][fnName] = async function (...args: Array<any>) {
        if (args.length !== description.parameterCount) {
            throw new Error(`${ns}.${fnName}: The arguments count should be ${description.parameterCount}.`);
        }

        let response;
        try {
            if (!description.method) {
                response = await axios.request(args[0]);
            } else {
                const params = { args: JSON.stringify(args) };
                switch (description.method) {
                    case 'GET':
                        response = await axios.get(path, { params });
                        break;
                    case 'POST':
                        response = await axios.post(path, { params });
                        break;
                    case 'PUT':
                        response = await axios.put(path, { params });
                        break;
                    case 'DELETE':
                        response = await axios.delete(path, { params });
                        break;
                }
            }
        } catch (error) {
            if (error && error.request && error.response && error.response.data) {
                response = error.response;
            } else {
                throw error;
            }
        }

        return response.data;
    };
});

requesters.controller.apis({ age: 'zhangsan' }, 'lisi').then(result => {
    console.log(result);
}).catch(response => {
    debugger;
});

export default requesters;
