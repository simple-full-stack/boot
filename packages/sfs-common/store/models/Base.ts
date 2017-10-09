import { set, clone, get, isArray, isString, isObject } from 'lodash';

export default class Base {
    state: { [key: string]: any } = {};

    protected set(path: string[] | string | object, value?: any) {
        if (isArray(path) || isString(path)) {
            set(this.state, path, value);
        } else if (isObject(path)) {
            for (let key in path) {
                set(this.state, key, path[key]);
            }
        }

        this.state = clone(this.state);
    }

    protected get(path): any {
        return get(this.state, path);
    }

    clear() {
        this.state = {};
    }
}
