/**
 * @file constants
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import { isString } from 'lodash';
import { default as Vue } from 'vue';

export interface IConstant {
    [key: string]: string;
}

interface IConstantsMap {
    [key: string]: IConstant;
}

const storeConstants: IConstantsMap = {};

export function getConstants(namespace: string): IConstant {
    return isString(namespace) ? storeConstants[namespace.replace(/:$/, '')] : {};
}

export function setConstants(namespace: string, constants: IConstant): void {
    storeConstants[namespace] = constants;
}

// 给 Vue 加上常量数据
Vue.use({
    /* tslint:disable:variable-name */
    install(VueClass: typeof Vue): void {
    /* tslint:enable:variable-name */
        Object.defineProperty(VueClass.prototype, 'getConstants', {
            configurable: true,
            enumerable: false,
            writable: false,
            value(namespace?: string): {} {
                return namespace
                    ? getConstants(namespace)
                    : getConstants((this as Vue).$namespace || '');
            },
        });

        // 非页面类型的组件才会存在 namespace prop
        VueClass.mixin({
            beforeCreate(): void {
                const vm: Vue = this as Vue;
                vm.$namespace = vm.$options.namespace;
                vm.$constants = isString(vm.$namespace) ? vm.getConstants(vm.$namespace) : {};
            },
        });
    },
});
