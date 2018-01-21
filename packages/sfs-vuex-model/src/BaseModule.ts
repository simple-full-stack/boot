/**
 * @file BaseModule
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import { assign, each, get, isObject, snakeCase } from 'lodash';
import { default as Vue} from 'vue';
import { setConstants } from './constants';
import action from './decorators/action';
import mutation from './decorators/mutation';
import { getStore } from './store';
import { Module, Store } from 'vuex';

type VuexModuleMap = Record<string, (_: {}, params: {}) => {} | undefined | null>;

export interface IState {
    [key: string]: {} | undefined | null;
}

function getActions(model: BaseModule, cstObj: {}): VuexModuleMap {
    const $$action: VuexModuleMap = {};
    each(model.$$action, (fnName: string) => {
        if (isObject(fnName)) {
            assign($$action, fnName);
            return;
        }

        const name: string = get(model.$nameMap, [fnName], fnName);
        const fn: Function = (get(model, fnName) as Function).bind(model);
        const actionName: string = `${model.$namespace}:${name}`;
        $$action[actionName] = (_: {}, params: {}): {} => fn(params);
        assign(model, {
            [fnName]: (params: {}): {} => model.dispatch(actionName, params),
        });

        // 生成常量
        assign(cstObj, {
            [name.replace(/[A-Z]{1}/g, (match: string) => (`_${match}`)).toUpperCase()]: actionName,
        });
    });
    return $$action;
}

function getMutations(model: BaseModule): VuexModuleMap {
    const $$mutation: VuexModuleMap = {};
    each(model.$$mutation, (fnName: string) => {
        if (isObject(fnName)) {
            assign($$mutation, fnName);
            return;
        }

        const name: string = get(model.$nameMap, [fnName], fnName);
        const fn: Function = (get(model, fnName) as Function).bind(model);
        const mutationName: string = `${model.$namespace}:${name}`;
        $$mutation[mutationName] = (_: {}, params: {}): {} => fn(params);

        assign(model, {
            [fnName]: (params: {}): void => getStore().commit(mutationName, params),
        });
    });

    return $$mutation;
}

function getGetters(model: BaseModule, constants: {}): VuexModuleMap {
    const $$getter: VuexModuleMap = {};
    each(model.$$getter, (fnName: string) => {
        if (isObject(fnName)) {
            assign($$getter, fnName);
            return;
        }

        const name: string = get(model.$nameMap, [fnName], fnName);
        const getterName: string = `${model.$namespace}:${name}`;
        $$getter[getterName] = (): {} => (get(model, fnName) as Function)();

        assign(constants, {
            [name.replace(/[A-Z]{1}/g, (match: string) => (`_${match}`)).toUpperCase()]: getterName,
        });
    });

    // 默认给所有 state 都生成 getter
    each(model.state, (_: {} | undefined | null, key: string) => {
        const name: string = get(model.$nameMap, [key], key);
        const getterName: string = `${model.$namespace}:${name}`;

        if (
            !(key in model)
            && !Object.prototype.hasOwnProperty.call($$getter, getterName)
        ) {
            $$getter[getterName] = (): {} | undefined | null => model.state && model.state[key];
            assign(model, {
                [key]: getStore().getters[getterName],
            });

            assign(constants, {
                [snakeCase(name).toUpperCase()]: getterName,
            });
        }
    });

    return $$getter;
}

function getState(model: BaseModule): IState {
    return model.state;
}

export type RawModule<S, R> = { namespace: string; constants: Record<string, string>; } & Module<S, R>;
export function createModule<R>(m: BaseModule): RawModule<IState, R> {
    const constants: Record<string, string> = {};
    const state: IState = getState(m);
    const $$mutation: VuexModuleMap = getMutations(m);
    const $$action: VuexModuleMap = getActions(m, constants);
    const $$getter: VuexModuleMap = getGetters(m, constants);

    return {
        actions: $$action,
        constants,
        getters: $$getter,
        mutations: $$mutation,
        namespace: m.$namespace.replace(/:$/, ''),
        state,
    };
}

export default class BaseModule {
    /**
     * 封装一下Vue.set
     *
     * @static
     * @param {Object} target 目标对象
     * @param {string} key key
     * @param {*} value value
     */
    // tslint:disable:no-reserved-keywords function-name
    public static set(target: IState, key: string, value: {}): void {
    // tslint:enable:no-reserved-keywords function-name
        Vue.set(target, key, value);
    }

    // 主要根据 ModelClass 创建 Model 实例。
    // tslint:disable:function-name
    public static create<R>(): RawModule<IState, R> {
    // tslint:enable:function-name
        const m: BaseModule = new this();
        return createModule(m);
    }

    /**
     * 创建并注册 module
     *
     * @public
     * @static
     */
    // tslint:disable:function-name
    public static register(): void {
    // tslint:enable:function-name
        const m: RawModule<IState, {}> = this.create();
        getStore().registerModule(m.namespace, m);
        setConstants(m.namespace, m.constants);
    }


    public $$getter: string[];

    public $$action: string[];

    public $$mutation: string[];

    /**
     * 在store中的命名空间
     *
     * @type {string}
     */
    public $namespace: string = '';

    /**
     * 名字映射转换
     *
     * @type {Object}
     */
    public $nameMap: Record<string, string> = {};

    /**
     * state
     *
     * @type {Object}
     */
    public state: IState = {};

    /**
     * 全局 store
     *
     * @type {Store}
     */
    protected $store: Store<{}> = getStore();

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
    public dispatch(name: string, params?: {}): {} {
        const realName: string = get(this.$nameMap, [name], name);
        return get(this, realName) || get(this, name)
            ? this.$store.dispatch(`${this.$namespace}:${realName}`, params)
            : this.$store.dispatch(name, params);
    }

    /**
     * commit mutation
     * 优先看name是不是在当前类成员里面。
     *
     * @param {string} name mutation名字
     * @param {Object} params 参数
     * @return {*}
     */
    protected commit(name: string, params: {}): void {
        const realName: string = get(this.$nameMap, [name], name);
        return get(this, realName) || get(this, name)
            ? this.$store.commit(`${this.$namespace}:${realName}`, params)
            : this.$store.commit(name, params);
    }

    /**
     * getter
     * 优先看name是不是在当前类成员里面。
     *
     * @param {string} name getter名字
     * @return {*}
     */
    protected getter(name: string): {} {
        const realName: string = get(this.$nameMap, [name], name);
        return get(this, realName) || get(this, name)
            ? this.$store.getters[`${this.$namespace}:${realName}`]
            : this.$store.getters[realName];
    }

    @mutation
    // tslint:disable:function-name
    protected $updateState(obj: {}): void {
    // tslint:enable:function-name
        each(obj, (value: {}, name: string) => BaseModule.set(this.state, name, value));
    }

    protected updateState<T>(name: string, value: T): void {
        this.commit('$updateState', { [name]: value });
    }

    @action
    // tslint:disable:no-empty
    protected enter(): void {}
    // tslint:enable:no-empty

    @action
    // tslint:disable:no-empty
    protected leave(): void {}
    // tslint:enable:no-empty
}
