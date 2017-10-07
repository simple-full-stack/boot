import IUser from '../../types/IUser';
import IFormFieldsErrors from '../../types/IFormFieldsErrors';

export interface IRegisterAction {
    type: 'user/register',
    payload: IUser
}

export interface IUserState {
    registerFormData: IUser;
    registerFormSubmitting: boolean;
    registerFormFieldsErrors: IFormFieldsErrors;
}
