import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import './RegisterForm.less';

class RegisterForm extends React.Component<FormComponentProps, any> {
    render() {
        const getFieldDecorator = this.props.form.getFieldDecorator;
        return (
            <div className="register-form">
                <Form>
                    <Form.Item label="昵称" labelCol={{span: 5}} wrapperCol={{span: 19}}>
                        {getFieldDecorator('nickname')(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item label="真实姓名" labelCol={{span: 5}} wrapperCol={{span: 19}}>
                        {getFieldDecorator('realName')(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item wrapperCol={{span: 19, offset: 5}}>
                        <Button type="primary">提交</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Form.create()(RegisterForm);
