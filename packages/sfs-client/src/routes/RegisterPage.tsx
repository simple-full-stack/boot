import { Card } from 'antd';
import { connect } from 'dva';
import { RouteComponentProps } from 'dva/router';
import { get } from 'lodash';
import * as React from 'react';
import { Dispatch } from 'react-redux';
import IFormFieldsErrors from 'sfs-common/types/IFormFieldsErrors';
import IUser from 'sfs-common/types/IUser';
import RegisterForm from '../components/RegisterForm';
import IFormChangedDescription from '../types/IFormChangedDescription';
import './RegisterPage.less';

interface IStateProps {
    submitting: boolean;
    formData: IUser;
    formDataErrors: IFormFieldsErrors;
}

interface IDispatchProps {
    onSubmit: (data: any) => Promise<any>;
    onChange: (data: IFormChangedDescription) => void;
}

class RegisterPage extends React.Component<IStateProps & IDispatchProps & RouteComponentProps<any>> {
    public render() {
        return (
            <div className='register-page'>
                <Card title='注册' className='register-card'>
                    <RegisterForm
                        onSubmit={this.props.onSubmit}
                        submitting={this.props.submitting}
                        onChange={this.props.onChange}
                        formData={this.props.formData}
                        formDataErrors={this.props.formDataErrors}
                    />
                </Card>
            </div>
        );
    }
}

function mapStateToProps(state: object): IStateProps {
    return {
        formData: get(state, 'user.registerFormData'),
        formDataErrors: get(state, 'user.registerFormFieldsErrors'),
        submitting: get(state, 'loading.models.user') || false,
    };
}

function mapDispatchToProps(
    dispatch: Dispatch<any>,
    ownProps: IStateProps & RouteComponentProps<any>,
): IDispatchProps {
    return {
        onChange: (data: IFormChangedDescription) => {
            return dispatch({ type: 'user/setRegisterFormData', payload: data });
        },
        onSubmit: async (data: IUser) => {
            const isSuccess: boolean = (await dispatch({ type: 'user/register', payload: data })) as any;
            if (isSuccess) {
                ownProps.history.push('/login');
            }
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
