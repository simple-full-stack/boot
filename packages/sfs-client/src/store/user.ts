import api from './api';
import IResponseData, { ResponseFieldsErrors } from '../types/IResponseData';
import { assign, set } from 'lodash';
import IFormChangedDescription, { IError } from '../types/IFormChangedDescription';
import { IRegisterAction, IUserState } from './types/user';
import { IFormFieldsErrors } from '../types/IFormChangedDescription';
import IEffectsUtils from '../types/IEffectsUtils';
import { convertServerFieldsErrors } from './helpers';

export default {
    namespace: 'user',

    state: {
        registerFormData: {},
        registerFormSubmitting: false,
        registerFormFieldsErrors: {}
    },

    subscriptions: {
    },

    effects: {
        *register(action: IRegisterAction, utils: IEffectsUtils) {
            const result: IResponseData = yield utils.call(api.userController.register, action.payload);
            if (result.httpCode !== 200) {
                yield utils.put({ type: 'setRegisterFieldsErrors', payload: result.fields });
            }

            return result.httpCode === 200;
        }
    },

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
        },
        setRegisterFieldsErrors(
            state: IUserState,
            { payload }: { payload?: ResponseFieldsErrors }
        ): IUserState {
            return assign({}, state, {
                registerFormFieldsErrors: convertServerFieldsErrors(payload || [])
            });
        }
    }
};
