import { IRegisterAction, IUserState } from './types/user';
import IEffectsUtils from './types/IEffectsUtils';
import IResponseData, { ResponseFieldsErrors } from '../types/IResponseData';
import { assign, get, set } from 'lodash';
import { convertServerFieldsErrors, extendModel, getAPIRequester } from './helpers';
import IModel from './types/IModel';
import IFormFieldsErrors, { IError } from 'sfs-common/types/IFormFieldsErrors';

export default function createUserModel(api: any, ...models: IModel[]): IModel {
    return extendModel({
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
                const userController = get(yield getAPIRequester(api), 'userController') as { register: (...args: any[]) => any };
                const result: IResponseData = yield utils.call(userController.register, action.payload);
                if (result.httpCode !== 200) {
                    yield utils.put({ type: 'setRegisterFieldsErrors', payload: result.fields });
                }

                return result.httpCode === 200;
            }
        },

        reducers: {
            setRegisterFormData(
                state: IUserState,
                { payload }: { payload: { [name: string]: { value: any, errors: IError[] } } }
            ) {
                const formData = {};
                const errors: IFormFieldsErrors = {};
                for (let field in payload) {
                    set(formData, field, payload[field].value);
                    if (payload[field].errors) {
                        errors[field] = payload[field].errors;
                    }
                }
                return assign({}, state, {
                    registerFormData: assign({}, state.registerFormData, formData),
                    registerFormFieldsErrors: errors
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
    }, ...models);
}
