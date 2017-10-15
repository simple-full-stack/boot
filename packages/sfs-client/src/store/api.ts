import axios from 'axios';
import { assign, camelCase, each, get } from 'lodash';
import { API_KEY, IRequesters } from './types/api';

const apiConfig = get(window, API_KEY);
const requesters: IRequesters = {};

each(apiConfig, (description, path) => {
    const [, , ns, fnName] = path.split('/');
    const nsCamel = camelCase(ns);
    requesters[nsCamel] = requesters[ns] || {};
    requesters[nsCamel][fnName] = async (...args: any[]) => {
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
                        response = await axios.post(path, params);
                        break;
                    case 'PUT':
                        response = await axios.put(path, params);
                        break;
                    case 'PATCH':
                        response = await axios.patch(path, params);
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

        return assign({}, response.data, { httpCode: response.status });
    };
});

export default requesters;
