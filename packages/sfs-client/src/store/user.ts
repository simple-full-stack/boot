import { assign, set } from 'lodash';
import createUserModel from 'sfs-common/store/createUserModel';
import IFormFieldsErrors, { IError } from 'sfs-common/types/IFormFieldsErrors';
import IFormChangedDescription from '../types/IFormChangedDescription';
import api from './api';
import { IUserState } from './types/user';

export default createUserModel(api, {
    reducers: {
        setRegisterFormData(
            state: IUserState,
            { payload }: { payload: IFormChangedDescription },
        ) {
            const formData = {};
            const errors: IFormFieldsErrors = {};
            for (const field in payload) {
                if (!payload.hasOwnProperty(field)) {
                    continue;
                }
                set(formData, field, payload[field].value);
                if (payload[field].errors) {
                    errors[field] = payload[field].errors as IError[];
                }
            }
            return assign({}, state, {
                registerFormData: assign({}, state.registerFormData, formData),
                registerFormFieldsErrors: assign({}, state.registerFormFieldsErrors, errors),
            });
        },
    },
});
