import * as React from 'react';
import { Router, Route, RouteComponentProps } from 'dva/router';
import RegisterPage from './routes/RegisterPage';

function RouterConfig(props: RouteComponentProps<any>) {
  return (
    <Router history={props.history}>
      <Route path="/register" component={RegisterPage} />
    </Router>
  );
}

export default RouterConfig;
