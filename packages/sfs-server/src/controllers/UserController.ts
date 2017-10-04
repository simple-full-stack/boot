import Controller, { api } from './Controller';
import IUser from 'sfs-common/types/IUser';
import HTTPContext from './HTTPContext';
import userService from '../services/userService';
import * as winston from 'winston';

export default class UserController extends Controller {

    @api({
        method: 'POST',
        params: [
            {
                type: 'object',
                properties: {
                    nickname: {
                        type: 'string'
                    },
                    realName: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    }
                },
                required: ['nickname', 'password']
            }
        ]
    })
    async register(user: IUser, context: HTTPContext) {
        try {
            await userService.register(user);
            context.data({});
        } catch (e) {
            winston.error(e);
            switch (e.code) {
                case 'ER_NO_DEFAULT_FOR_FIELD':
                    context.globalError('参数错误');
                    break;
                case 'ER_DUP_ENTRY':
                    context.fieldsError([{ dataPath: '[0].nickname', message: '该昵称已被使用' }]);
                    break;
            }
        }
    }
}
