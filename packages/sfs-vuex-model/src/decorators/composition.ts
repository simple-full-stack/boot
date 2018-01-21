/**
 * @file composition
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import { camelCase, set, get } from 'lodash';
import BaseModule, { createModule } from '../BaseModule';
import { getStore } from '../store';
import { setConstants } from '../constants';

// tslint:disable:variable-name
export type MixType = <T extends BaseModule>(Target: new () => BaseModule) => new () => T;
// tslint:enable:variable-name

// tslint:disable:variable-name
export function composition(Class: new () => BaseModule, fieldName?: string): MixType {
// tslint:enable:variable-name
    const store = getStore();

    const pureFieldName: string = fieldName || camelCase(Class.name);
    const realFieldName: string = `$${pureFieldName}`;
    // tslint:disable:variable-name
    return function mix<T extends BaseModule>(Target: new () => BaseModule): new () => T {
    // tslint:enable:variable-name
        class Model extends Target {
            constructor() {
                super();

                if (realFieldName in this) {
                    throw new Error(`There is already a field name: ${realFieldName} in class: ${Target}`);
                }

                const m: BaseModule = new Class();
                // 强制覆盖掉 namespace
                m.$namespace = `${this.$namespace}${pureFieldName}:`;
                set(this, realFieldName, createModule(m));
                store.registerModule(this.$namespace + pureFieldName, get(this, realFieldName));
                setConstants(
                    get(this, [realFieldName, 'namespace']),
                    get(this, [realFieldName, 'constants']),
                );
            }
        }
        return Model as (new () => T);
    };
}
