import { Layout } from 'antd';
import { connect } from 'dva';
import { RouteComponentProps } from 'dva/router';
import * as React from 'react';

interface IDashboardStateProps {
    holder?: string;
}

interface IDashboardDispatchProps {
    holder?: string;
}

class Dashboard extends React.Component<IDashboardStateProps & IDashboardDispatchProps & RouteComponentProps<any>> {
    public render() {
        const { Header, Sider, Content, Footer } = Layout;
        return (
            <Layout>
                <Header>111</Header>
                <Layout>
                    <Sider>1111</Sider>
                    <Layout>
                        <div>123</div>
                        <Content>1111</Content>
                    </Layout>
                </Layout>
                <Footer>456</Footer>
            </Layout>
        );
    }
}

function mapStateToProps(): IDashboardStateProps {
    return {};
}

function mapDispatchToProps(): IDashboardDispatchProps {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
