import * as React from 'react';
import { connect } from 'dva';
import { RouteComponentProps } from 'dva/router';
import { Card } from 'antd';
import RegisterForm from '../components/RegisterForm';
import './RegisterPage.less';
import IUser from 'sfs-common/types/IUser';
import { get } from 'lodash';
import { Dispatch } from 'react-redux';
import IFormChangedDescription from '../types/IFormChangedDescription';
import IFormFieldsErrors from 'sfs-common/types/IFormFieldsErrors';

interface StateProps {
    submitting: boolean;
    formData: IUser;
    formDataErrors: IFormFieldsErrors;
}

interface DispatchProps {
    onSubmit: (data: any) => Promise<any>;
    onChange: (data: IFormChangedDescription) => void;
}

class RegisterPage extends React.Component<StateProps & DispatchProps & RouteComponentProps<any>> {
    render() {
        return (
            <div className="register-page">
                <Card title="注册" className="register-card">
                    <RegisterForm onSubmit={this.props.onSubmit}
                        submitting={this.props.submitting}
                        onChange={this.props.onChange}
                        formData={this.props.formData}
                        formDataErrors={this.props.formDataErrors}></RegisterForm>
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state: object): StateProps {
    return {
        submitting: get(state, 'loading.models.user') || false,
        formData: get(state, 'user.registerFormData'),
        formDataErrors: get(state, 'user.registerFormFieldsErrors')
    };
}

function mapDispatchToProps(
    dispatch: Dispatch<any>,
    ownProps: StateProps & RouteComponentProps<any>
): DispatchProps {
    return {
        onSubmit: async (data: IUser) => {
            const isSuccess: boolean = (await dispatch({ type: 'user/register', payload: data })) as any;
            if (isSuccess) {
                ownProps.history.push('/login');
            }
        },
        onChange: (data: IFormChangedDescription) => {
            return dispatch({ type: 'user/setRegisterFormData', payload: data });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);;
