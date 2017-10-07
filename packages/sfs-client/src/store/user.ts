import api from './api';
import { assign, set } from 'lodash';
import IFormChangedDescription from '../types/IFormChangedDescription';
import { IError } from 'sfs-common/types/IFormFieldsErrors';
import { IUserState } from './types/user';
import IFormFieldsErrors from 'sfs-common/types/IFormFieldsErrors';
import createUserModel from 'sfs-common/store/createUserModel';

export default createUserModel(api, {
    reducers: {
        setRegisterFormData(
            state: IUserState,
            { payload }: { payload: IFormChangedDescription }
        ) {
            const formData = {};
            const errors: IFormFieldsErrors = {};
            for (let field in payload) {
                set(formData, field, payload[field].value);
                if (payload[field].errors) {
                    errors[field] = payload[field].errors as IError[];
                }
            }
            return assign({}, state, {
                registerFormData: assign({}, state.registerFormData, formData),
                registerFormFieldsErrors: assign({}, state.registerFormFieldsErrors, errors)
            });
        }
    }
});
