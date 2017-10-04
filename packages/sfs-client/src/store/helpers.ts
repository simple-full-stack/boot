import { ResponseFieldsErrors } from '../types/IResponseData';
import { each } from 'lodash';
import { IFormFieldsErrors } from '../types/IFormChangedDescription';

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
