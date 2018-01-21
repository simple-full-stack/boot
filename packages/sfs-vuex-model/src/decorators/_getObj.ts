/**
 * @file _getObj
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import { cloneDeep } from 'lodash';

export default function getObj<T>(target: Record<string, {}>, key: string, dft?: T): T {
    const result: {} = (
        Object.prototype.hasOwnProperty.call(target, key)
            ? target[key] : cloneDeep(target[key])
    ) || (dft === undefined ? [] : dft);
    return result as T;
}
