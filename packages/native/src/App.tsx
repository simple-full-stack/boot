/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import { StackNavigator } from 'react-navigation';
import RegisterPage from './routes/RegisterPage';
import * as React from 'react';

const App = StackNavigator({
    Register: { screen: RegisterPage }
});

export default function a() {
    return (<App />);
};
