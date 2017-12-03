import { Module, Store } from 'vuex';
export declare type RawModule<S, R> = {
    namespace: string;
    constants: Record<string, string>;
} & Module<S, R>;
export declare function createModule<R>(m: BaseModule): RawModule<Record<string, {}>, R>;
export default class BaseModule {
    /**
     * 封装一下Vue.set
     *
     * @static
     * @param {Object} target 目标对象
     * @param {string} key key
     * @param {*} value value
     */
    static set(target: Record<string, {}>, key: string, value: {}): void;
    static create<R>(): RawModule<Record<string, {}>, R>;
    /**
     * 创建并注册 module
     *
     * @public
     * @static
     */
    static register(): void;
    $$getter: string[];
    $$action: string[];
    $$mutation: string[];
    /**
     * 在store中的命名空间
     *
     * @type {string}
     */
    $namespace: string;
    /**
     * 名字映射转换
     *
     * @type {Object}
     */
    $nameMap: Record<string, string>;
    /**
     * state
     *
     * @type {Object}
     */
    state: Record<string, {}>;
    /**
     * 全局 store
     *
     * @type {Store}
     */
    protected $store: Store<{}>;
    /**
     * dispatch action 。
     * 优先看这个action name是不是在当前类成员里面。
     *
     * @protected
     * @param {string} name action名字
     * @param {Object} params 参数
     * @param {Function} dispatch dispatch函数
     * @return {*}
     */
    dispatch(name: string, params?: {}): {};
    /**
     * commit mutation
     * 优先看name是不是在当前类成员里面。
     *
     * @param {string} name mutation名字
     * @param {Object} params 参数
     * @return {*}
     */
    protected commit(name: string, params: {}): void;
    /**
     * getter
     * 优先看name是不是在当前类成员里面。
     *
     * @param {string} name getter名字
     * @return {*}
     */
    protected getter(name: string): {};
    protected $updateState(obj: {}): void;
    protected updateState<T>(name: string, value: T): void;
    protected enter(): void;
    protected leave(): void;
}
