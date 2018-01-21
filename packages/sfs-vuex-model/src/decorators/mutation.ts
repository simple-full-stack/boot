/**
 * @file mutation
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import { assign } from 'lodash';
import getObj from './_getObj';

export interface IMutationModule extends Record<string, {}> {
    $$mutation: string[];
}

export default function mutation(target: {}, key: string): void {
    const mutationModule: IMutationModule = target as IMutationModule;
    assign(mutationModule, { $$mutation: getObj(mutationModule, '$$mutation') });
    if (mutationModule.$$mutation.indexOf(key) === -1) {
        mutationModule.$$mutation.push(key);
    }
}
