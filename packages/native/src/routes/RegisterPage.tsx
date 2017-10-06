import * as React from 'react';
import { getRequesters } from '../store/api';
import { InputItem, Button, List } from 'antd-mobile';
import inputItemStyles from 'antd-mobile/lib/input-item/style';
import buttonStyle from 'antd-mobile/lib/button/style';
import themeVariables from 'antd-mobile/lib/style/themes/default';
import { extendStyleSheet } from '../common/utils';

const styles = {
    inputItemLayout: extendStyleSheet(inputItemStyles, { text: { textAlign: 'right' } }),
    buttonLayout: extendStyleSheet(buttonStyle, {
        wrapperStyle: {
            borderRadius: themeVariables.radius_sm,
            width: 100
        },
        defaultRaw: {
            backgroundColor: 'red'
        }
    })
};

export default class RegisterPage extends React.Component {
    async componentDidMount() {
        console.log(await getRequesters());
    }

    onSubmit() {
        console.log('submit');
    }

    render() {
        return (
            <List renderHeader={() => '注册'}>
                <InputItem styles={ styles.inputItemLayout }>昵称</InputItem>
                <InputItem styles={ styles.inputItemLayout }>真实姓名</InputItem>
                <InputItem styles={ styles.inputItemLayout }>密码</InputItem>
                <InputItem styles={ styles.inputItemLayout }>确认密码</InputItem>
                <List.Item><Button type="primary" styles={ styles.buttonLayout }>提交</Button></List.Item>
            </List>
        );
    }
}
