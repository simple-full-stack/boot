import { camelCase, each, assign, get } from 'lodash';
import * as axios from 'react-native-axios';
import { API_KEY, IRequesters } from './types/api';

let requesters: IRequesters;

export async function getRequesters() {
    if (requesters) {
        return requesters;
    }

    const result = await fetch('http://localhost:3000/api/all');
    const text = await result.text();
    eval(text);

    const apiConfig = get(window, API_KEY);
    if (!apiConfig) {
        throw new Error('can not get the apis!');
    }

    requesters = {};
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
                    const config = {
                        baseURL: 'http://localhost:3000'
                    };
                    switch (description.method) {
                        case 'GET':
                            response = await axios.get(path, { params, ...config });
                            break;
                        case 'POST':
                            response = await axios.post(path, params, config);
                            break;
                        case 'PUT':
                            response = await axios.put(path, params, config);
                            break;
                        case 'PATCH':
                            response = await axios.patch(path, params, config);
                            break;
                        case 'DELETE':
                            response = await axios.delete(path, { params, ...config });
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

            return assign({}, response.data, { httpCode: response.status });
        };
    });

    return requesters;
}
