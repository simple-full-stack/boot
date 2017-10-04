export default class InvalidNickname extends Error {
    readonly code: string = 'INVALID_NICKNAME';

    constructor(msg?: string) {
        super(msg || '昵称不正确');
    }
}
