import * as React from 'react';
import { Router, Route, RouteComponentProps } from 'dva/router';
import RegisterPage from './routes/RegisterPage';
// import Dashboard from './routes/Dashboard';

function RouterConfig(props: RouteComponentProps<any>) {
    return (
        <Router history={props.history}>
            <Route path="/register" component={RegisterPage} />
            {/* <Route path="/dashboard" component={Dashboard} /> */}
        </Router>
    );
}

export default RouterConfig;
