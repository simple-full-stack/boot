import app from './modules/app';
import user from './modules/user';
import store from '../vuex-model';

store.registerModule('app', app);
store.registerModule('user', user);

export default store;
