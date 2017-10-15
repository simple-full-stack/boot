import { set, get, isArray, isString, isObject, assign, cloneDeep } from 'lodash';

export interface State {
    [key: string]: any;
}

export type Path = string[] | string | { [key: string]: any };

export default class Base {
    private state: State = assign(cloneDeep(this.getDefaultState()), this.getInitialState());

    protected getInitialState(): State {
        return {};
    }

    protected getDefaultState(): State {
        return {};
    }

    protected set(path: Path, value?: any) {
        if (isArray(path) || isString(path)) {
            set(this.state, path, value);
        } else if (isObject(path)) {
            for (let key in path) {
                set(this.state, key, path[key]);
            }
        }
    }

    protected get<T>(path: Path, dft?: T): T {
        return get(this.state, path, dft);
    }

    getState(): State {
        return this.state;
    }

    reset() {
        assign(this.state, cloneDeep(this.getDefaultState()));
    }
}
