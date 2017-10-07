import IUser from 'sfs-common/types/IUser';
import IFormFieldsErrors from 'sfs-common/types/IFormFieldsErrors';

export interface IRegisterAction {
    type: 'user/register',
    payload: IUser
}

export interface IUserState {
    registerFormData: IUser;
    registerFormSubmitting: boolean;
    registerFormFieldsErrors: IFormFieldsErrors;
}
