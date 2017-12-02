/**
 * @file action
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import { assign } from 'lodash';
import getObj from './_getObj';

export interface IActionModule extends Record<string, {}> {
    $$action: string[];
}

export default function action(target: {}, key: string): void {
    const actionModule: IActionModule = target as IActionModule;
    assign(actionModule, { $$action: getObj(actionModule, '$$action') });
    if (actionModule.$$action.indexOf(key) === -1) {
        actionModule.$$action.push(key);
    }
}
