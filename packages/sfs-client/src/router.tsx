import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import Dashboard from './routes/Dashboard';
import RegisterPage from './routes/RegisterPage';

const routes = [
    {
        component: (props: any) => renderRoutes(props.route.routes),
        routes: [
            {
                component: RegisterPage,
                exact: true,
                path: '/register',
            },
            {
                component: Dashboard,
                exact: true,
                path: '/dashboard',
            },
        ],
    },
];

function RouterConfig() {
    return (
        <BrowserRouter><HashRouter>{renderRoutes(routes)}</HashRouter></BrowserRouter>
    );
}

export default RouterConfig;
