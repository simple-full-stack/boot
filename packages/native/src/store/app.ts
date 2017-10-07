import dva from 'dva-no-router';
import { getRequesters } from './api';
import user from './user';

const app = dva();

app.model(user(getRequesters));

export default app;
