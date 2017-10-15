import * as React from 'react';
import { InputItem, Button, List, Toast } from 'antd-mobile';
import inputItemStyles from 'antd-mobile/lib/input-item/style';
import { extendStyleSheet } from '../common/utils';
import { connect } from 'dva-no-router';
import { Dispatch } from 'react-redux';
import { get, assign } from 'lodash';
import IUser from 'sfs-common/types/IUser';
import IReactNavigationProps from './types/IReactNavigationProps';
import IFormFieldsErrors, { IError } from 'sfs-common/types/IFormFieldsErrors';

const styles = {
    inputItemLayout: extendStyleSheet(inputItemStyles, { text: { textAlign: 'right' } })
};

interface RegisterPageStateProps {
    formData: IUser,
    submitting: boolean;
    formDataErrors: IFormFieldsErrors;
}

interface RegisterPageDispatchProps {
    onChange: (data: any) => void;
    onSubmit: (data: IUser) => Promise<any>;
}

class RegisterPage extends React.Component<RegisterPageStateProps & RegisterPageDispatchProps & IReactNavigationProps> {
    static navigationOptions = {
        title: '注册'
    };

    onSubmit() {
        if (this.validate(this.props.formData)) {
            this.props.onSubmit(this.props.formData);
        }
    }

    onChange(field: string, value: any) {
        this.props.onChange({
            [field]: {
                value,
                errors: this.props.formDataErrors[field]
            }
        });
        this.validate(assign({}, this.props.formData, { [field]: value }));
    }

    validate(formData: IUser): boolean {
        let isValid = true;
        let changes: { [field: string]: any } = {};

        if (!formData.nickname) {
            isValid = false;
            changes.nickname = {
                value: formData.nickname,
                errors: [{ field: 'nickname', message: '请输入昵称' }]
            };
        }

        if (!formData.password) {
            isValid = false;
            changes.password = {
                value: formData.password,
                errors: [{ field: 'password', message: '请输入密码' }]
            };
        }

        if (formData.password !== formData.confirmPassword) {
            isValid = false;
            changes.confirmPassword = {
                value: formData.confirmPassword,
                errors: [{ field: 'confirmPassword', message: '两次密码输入不一致' }]
            };
        }

        this.props.onChange(changes);

        return isValid;
    }

    showError(errors: IError[]) {
        if (errors && errors.length) {
            Toast.fail(errors[0].message);
        }
    }

    render() {
        return (
            <List renderHeader={() => '注册'}>
                <InputItem styles={ styles.inputItemLayout }
                    value={this.props.formData.nickname}
                    onChange={(value: string) => this.onChange('nickname', value)}
                    error={this.props.formDataErrors.nickname && !!this.props.formDataErrors.nickname.length}
                    onErrorClick={() => this.showError(this.props.formDataErrors.nickname)}>昵称</InputItem>
                <InputItem styles={ styles.inputItemLayout }
                    value={this.props.formData.realName}
                    onChange={(value: string) => this.onChange('realName', value)}
                    error={this.props.formDataErrors.realName && !!this.props.formDataErrors.realName.length}
                    onErrorClick={() => this.showError(this.props.formDataErrors.realName)}>真实姓名</InputItem>
                <InputItem styles={ styles.inputItemLayout }
                    value={this.props.formData.password}
                    onChange={(value: string) => this.onChange('password', value)}
                    error={this.props.formDataErrors.password && !!this.props.formDataErrors.password.length}
                    onErrorClick={() => this.showError(this.props.formDataErrors.password)}>密码</InputItem>
                <InputItem styles={ styles.inputItemLayout }
                    value={this.props.formData.confirmPassword}
                    onChange={(value: string) => this.onChange('confirmPassword', value)}
                    error={this.props.formDataErrors.confirmPassword && !!this.props.formDataErrors.confirmPassword.length}
                    onErrorClick={() => this.showError(this.props.formDataErrors.confirmPassword)}>确认密码</InputItem>
                <List.Item>
                    <Button type="primary"
                        style={{ height: 40, width: 80, marginLeft: 80 }}
                        onClick={() => this.onSubmit()}>提交</Button>
                </List.Item>
            </List>
        );
    }
}

function mapStateToProps(state: object): RegisterPageStateProps {
    return {
        submitting: get(state, 'loading.models.user', false),
        formData: get(state, 'user.registerFormData', { nickname: '' }),
        formDataErrors: get(state, 'user.registerFormFieldsErrors', {})
    };
}

function mapDispatchToProps(
    dispatch: Dispatch<any>,
    ownProps: RegisterPageStateProps & IReactNavigationProps
): RegisterPageDispatchProps {
    return {
        onSubmit: async (data: IUser) => {
            const isSuccess: boolean = (await dispatch({ type: 'user/register', payload: data })) as any;
            if (isSuccess) {
                ownProps.navigation.navigate('login');
            }
        },
        onChange: (data: any) => {
            return dispatch({ type: 'user/setRegisterFormData', payload: data });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
