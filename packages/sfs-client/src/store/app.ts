import dva from 'dva';
import user from '../store/user';

const app = dva();

app.model(user);

export default app;
