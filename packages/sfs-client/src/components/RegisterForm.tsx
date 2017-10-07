import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import './RegisterForm.less';
import IFormChangedDescription from '../types/IFormChangedDescription';
import IUser from 'sfs-common/types/IUser';
import IFormFieldsErrors from 'sfs-common/types/IFormFieldsErrors';

interface RegisterFormProps {
    onSubmit: (data: any) => void;
    onChange: (data: IFormChangedDescription) => void;
    submitting: boolean;
    formData: IUser;
    formDataErrors: IFormFieldsErrors;
}

class RegisterForm extends React.Component<RegisterFormProps & FormComponentProps> {
    onSubmit(event: React.FormEvent<any>) {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    }

    render() {
        const getFieldDecorator = this.props.form.getFieldDecorator;
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol: {
                span: 19
            }
        };
        return (
            <div className="register-form">
                <Form onSubmit={event => this.onSubmit(event)}>
                    <Form.Item label="昵称" {...formItemLayout}>
                        {getFieldDecorator('nickname', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入昵称'
                                }
                            ]
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="真实姓名" {...formItemLayout}>
                        {getFieldDecorator('realName')(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="登录密码" {...formItemLayout}>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入登录密码'
                                }
                            ]
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                    <Form.Item label="确认密码" {...formItemLayout}>
                        {getFieldDecorator('confirmPassword', {
                            rules: [
                                {
                                    required: true,
                                    message: '请确认登录密码'
                                }
                            ]
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 19, offset: 5 }}>
                        <Button type="primary" htmlType="submit" loading={this.props.submitting}>提交</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create({
    onFieldsChange(props: RegisterFormProps, changedFields) {
        const changed = (changedFields as any) as IFormChangedDescription;
        props.onChange(changed);
    },
    mapPropsToFields(props) {
        return {
            nickname: {
                value: props.formData.nickname,
                errors: props.formDataErrors.nickname
            },
            realName: {
                value: props.formData.realName,
                errors: props.formDataErrors.realName
            },
            password: {
                value: props.formData.password,
                errors: props.formDataErrors.password
            },
            confirmPassword: {
                value: props.formData.confirmPassword,
                errors: props.formDataErrors.confirmPassword
            }
        };
    }
})(RegisterForm);
