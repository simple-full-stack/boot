import { assign, camelCase } from 'lodash';
import * as express from 'express';
import * as Ajv from 'ajv';
import HTTPContext from './HTTPContext';

interface APIDescription {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION';
    path?: string;
    handler?: (req: express.Request, res: express.Response) => void;
    script?: string;
    params?: Array<object>;
}

interface APIInfoMap {
    [key: string]: APIDescription
}

export interface ControllerClassType {
    new (): Controller;
}

export interface ControllerModule {
    default: ControllerClassType;
    api: (description: APIDescription) => void;
}

const API_INFO_MAP_KEY = '__apiInfoMap__';

const ajv = new Ajv({allErrors: true});

function getProtoAPIInfo(obj: any) {
    const proto = Object.getPrototypeOf(obj);
    if (proto) {
        if (proto.hasOwnProperty(API_INFO_MAP_KEY)) {
            return proto[API_INFO_MAP_KEY];
        }

        if (proto[API_INFO_MAP_KEY]) {
            return getProtoAPIInfo(proto);
        }
    }

    return {};
}

export function api(description: APIDescription) {
    return function (target: Controller, propertyKey: string, descriptor: PropertyDescriptor) {
        const apiInfoMap = (target.hasOwnProperty(API_INFO_MAP_KEY) ? target[API_INFO_MAP_KEY] : {}) as APIInfoMap
        assign(apiInfoMap, getProtoAPIInfo(target));

        const schemas = {
            type: 'array',
            items: description.params || []
        };
        const validator = ajv.compile(schemas);

        const constructorName = target.constructor['name'];
        const urlPath = `/api/${constructorName}/${propertyKey}`;
        const method = description.method || 'GET';
        const parameterCount = target[propertyKey].length - 1;
        const apiInfo = assign(
            { method },
            description,
            {
                handler(req: express.Request, res: express.Response) {
                    const args = JSON.parse(req.query.args || req.body.args || '[]') as Array<any>;
                    if (args.length !== parameterCount) {
                        throw new Error(`wrong paramter count: ${parameterCount}`);
                    }

                    const context = new HTTPContext(req, res);
                    const valid = validator(args);
                    if (!valid) {
                        context.fieldsError(validator.errors);
                    } else {
                        target[propertyKey](...args, context);
                    }
                },
                path: urlPath,
                script: `
                    var API_KEY = '__api__';
                    window[API_KEY] = window[API_KEY] || {};
                    window[API_KEY]['${urlPath}'] = {
                        method: '${method}',
                        parameterCount: ${parameterCount}
                    };
                `
            }
        );
        apiInfoMap[propertyKey] = apiInfo;
        target[API_INFO_MAP_KEY] = apiInfoMap;
    }
}

export default class Controller {

    get apiInfoMap(): APIInfoMap {
        return this[API_INFO_MAP_KEY];
    }

    @api({
        method: 'GET',
        params: [
            {
                type: 'object',
                properties: {
                    age: {
                        type: 'number'
                    }
                }
            },
            {
                type: 'number'
            }
        ]
    })
    apis(name1, name2, context: HTTPContext) {
        context.data(name1 + name2);
    }
}
