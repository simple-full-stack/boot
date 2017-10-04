export default class InvalidPassword extends Error {
    readonly code: string = 'INVALID_PASSWORD';

    constructor(msg?: string) {
        super(msg || '密码不正确');
    }
}
