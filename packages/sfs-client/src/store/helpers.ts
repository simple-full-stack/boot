import { ResponseFieldsErrors } from '../types/IResponseData';
import { each } from 'lodash';
import { IFormFieldsErrors } from '../types/IFormChangedDescription';

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
