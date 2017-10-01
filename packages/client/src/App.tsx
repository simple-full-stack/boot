import * as React from 'react';
import { Card } from 'antd';
import './App.less';
import RegisterForm from './components/RegisterForm';

export default class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Card title="注册" className="register-card">
                    <RegisterForm></RegisterForm>
                </Card>
            </div>
        );
    }
}
