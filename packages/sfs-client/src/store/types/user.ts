import IUser from 'sfs-common/types/IUser';
import { IFormFieldsErrors } from '../../types/IFormChangedDescription';

export interface IRegisterAction {
    type: 'user/register',
    payload: IUser
}

export interface IUserState {
    registerFormData: IUser;
    registerFormSubmitting: boolean;
    registerFormFieldsErrors: IFormFieldsErrors;
}
