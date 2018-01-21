/**
 * @file getter
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import { assign } from 'lodash';
import getObj from './_getObj';

export interface IGetterModule extends Record<string, {}> {
    $$getter: string[];
}

export function getter(target: {}, key: string): void {
    const getterModule: IGetterModule = <IGetterModule>target;
    assign(getterModule, { $$getter: getObj(getterModule, '$$getter') });
    if (getterModule.$$getter.indexOf(key) === -1) {
        getterModule.$$getter.push(key);
    }
}
