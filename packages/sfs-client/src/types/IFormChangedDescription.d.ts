import { IError } from 'sfs-common/types/IFormFieldsErrors';

export default interface IFormChangedDescription {
    [field: string]: {
        name: string;
        value: any;
        errors?: IError[];
    };
}
