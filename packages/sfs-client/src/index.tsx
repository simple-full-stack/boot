import createLoading from 'dva-loading';
import 'regenerator-runtime/runtime';
import './assets/css/main.less';
import router from './router';
import './store/api';
import app from './store/app';

app.use(createLoading());
app.router(router);
app.start('#root');
