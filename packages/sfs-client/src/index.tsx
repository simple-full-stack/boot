import './assets/css/main.less';
import 'regenerator-runtime/runtime';
import './store/api';
import app from './store/app';
import router from './router';
import createLoading from 'dva-loading';

app.use(createLoading());
app.router(router);
app.start('#root');
