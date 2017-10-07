export default interface IEffectsUtils {
    call: (fn: (...args: any[]) => any, data: any) => Promise<any>;
    put: (arg: any) => Promise<any>;
    select: <T>(fn: (state: any) => T) => Promise<T>;
}
