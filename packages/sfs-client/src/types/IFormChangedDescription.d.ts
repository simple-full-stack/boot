export interface IError {
    field: string;
    message: string;
}

export default interface IFormChangedDescription {
    [field: string]: {
        name: string;
        value: any;
        errors?: IError[];
    };
}

export interface IFormFieldsErrors {
    [field: string]: IError[];
}
