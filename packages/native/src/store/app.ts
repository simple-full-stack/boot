import dva from 'dva-no-router';
import user from './user';

const app = dva();

app.model(user());

export default app;
