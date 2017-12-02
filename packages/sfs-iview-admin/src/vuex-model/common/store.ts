/**
 * @file store
 * @author yibuyisheng(yibuyisheng@163.com)
 */
import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
});
