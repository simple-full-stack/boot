import IFieldError from './IFieldError';

export declare type ResponseFieldsErrors = IFieldError[];
export declare type ResponseGlobalError = string | object;
export declare type ResponseSuccess = any;

export default interface IResponseData {
    fields?: ResponseFieldsErrors;
    data?: ResponseSuccess;
    global?: ResponseGlobalError;
    httpCode: number;
}
