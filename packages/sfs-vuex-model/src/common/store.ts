/**
 * @file store
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import Vuex, {Store} from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

let store: Store<{}>;

export default function (strict: boolean = false): Store<{}> {
    if (store) {
        return store;
    }

    store = new Store({
        strict,
    });

    return store;
}

export function getStore(): Store<{}> {
    if (!store) {
        throw new Error('Please create store first.');
    }

    return store;
}
