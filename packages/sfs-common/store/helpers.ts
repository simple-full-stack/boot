import { ResponseFieldsErrors } from '../types/IResponseData';
import { each, keys, reduce, extend, get } from 'lodash';
import IFormFieldsErrors from '../types/IFormFieldsErrors';
import IModel from './types/IModel';

/**
 * 将后端的错误格式转换成 antd.Form 能使用的错误格式。
 *
 * @param {ResponseFieldsErrors} serverErrors 后端返回的错误
 * @return {IFormFieldsErrors} 转换后的错误
 */
export function convertServerFieldsErrors(serverErrors: ResponseFieldsErrors): IFormFieldsErrors {
    const errors: IFormFieldsErrors = {};
    each(serverErrors, (item) => {
        const fieldName = item.dataPath.replace(/^\[0\]\./, '');
        errors[fieldName] = [{
            field: fieldName,
            message: item.message
        }];
    });
    return errors;
}

export function extendModel(base: IModel, ...models: IModel[]) {
    return reduce(models, (prev, cur) => {
        [...keys(prev), ...keys(cur)].forEach(key => {
            extend({}, get(prev, key), get(cur, key));
        });
        return prev;
    }, base);
}

export function getAPIRequester<R>(api: any): Promise<R> {
    return Promise.resolve(typeof api === 'function' ? api() : api);
}
