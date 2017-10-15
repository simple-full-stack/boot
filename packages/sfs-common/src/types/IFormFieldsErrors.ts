export interface IError {
    field: string;
    message: string;
}

export default interface IFormFieldsErrors {
    [field: string]: IError[];
}
