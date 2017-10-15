import { Button, Form, Input } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import * as React from 'react';
import IFormFieldsErrors from 'sfs-common/types/IFormFieldsErrors';
import IUser from 'sfs-common/types/IUser';
import IFormChangedDescription from '../types/IFormChangedDescription';
import './RegisterForm.less';

interface IRegisterFormProps {
    onSubmit: (data: any) => void;
    onChange: (data: IFormChangedDescription) => void;
    submitting: boolean;
    formData: IUser;
    formDataErrors: IFormFieldsErrors;
}

class RegisterForm extends React.Component<IRegisterFormProps & FormComponentProps> {
    public render() {
        const getFieldDecorator = this.props.form.getFieldDecorator;
        const formItemLayout = {
            labelCol: {
                span: 5,
            },
            wrapperCol: {
                span: 19,
            },
        };

        const nicknameFieldDecorator = getFieldDecorator('nickname', {
            rules: [
                {
                    message: '请输入昵称',
                    required: true,
                },
            ],
        })(<Input />);
        const realNameFieldDecorator = getFieldDecorator('realName')(<Input />);
        const passwordFieldDecorator = getFieldDecorator('password', {
            rules: [
                {
                    message: '请输入登录密码',
                    required: true,
                },
            ],
        })(
            <Input type='password' />,
        );
        const confirmPasswordFieldDecorator = getFieldDecorator('confirmPassword', {
            rules: [
                {
                    message: '请确认登录密码',
                    required: true,
                },
            ],
        })(
            <Input type='password' />,
        );
        return (
            <div className='register-form'>
                <Form onSubmit={this.onSubmit}>
                    <Form.Item label='昵称' {...formItemLayout}>
                        {nicknameFieldDecorator}
                    </Form.Item>
                    <Form.Item label='真实姓名' {...formItemLayout}>
                        {realNameFieldDecorator}
                    </Form.Item>
                    <Form.Item label='登录密码' {...formItemLayout}>
                        {passwordFieldDecorator}
                    </Form.Item>
                    <Form.Item label='确认密码' {...formItemLayout}>
                        {confirmPasswordFieldDecorator}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 19, offset: 5 }}>
                        <Button type='primary' htmlType='submit' loading={this.props.submitting}>提交</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

    private onSubmit = (event: React.FormEvent<any>) => {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err: any, values: any) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    }
}

export default Form.create({
    onFieldsChange(props: IRegisterFormProps, changedFields) {
        const changed = (changedFields as any) as IFormChangedDescription;
        props.onChange(changed);
    },
    mapPropsToFields(props) {
        return {
            confirmPassword: {
                errors: props.formDataErrors.confirmPassword,
                value: props.formData.confirmPassword,
            },
            nickname: {
                errors: props.formDataErrors.nickname,
                value: props.formData.nickname,
            },
            password: {
                errors: props.formDataErrors.password,
                value: props.formData.password,
            },
            realName: {
                errors: props.formDataErrors.realName,
                value: props.formData.realName,
            },
        };
    },
})(RegisterForm);
