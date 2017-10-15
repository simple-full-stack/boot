import * as React from 'react';
import { connect } from 'dva';
import { RouteComponentProps } from 'dva/router';
import { Layout } from 'antd';

interface DashboardStateProps {}

interface DashboardDispatchProps {}

class Dashboard extends React.Component<DashboardStateProps & DashboardDispatchProps & RouteComponentProps<any>> {
    render() {
        const { Header, Sider, Content, Footer } = Layout;
        return (
            <Layout>
                <Header></Header>
                <Layout>
                    <Sider></Sider>
                    <Layout>
                        <div>123</div>
                        <Content></Content>
                    </Layout>
                    <Footer>456</Footer>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(): DashboardStateProps {
    return {};
}

function mapDispatchToProps(): DashboardDispatchProps {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
