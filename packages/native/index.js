import { AppRegistry } from 'react-native';
import App from './src/App';
import { getRequesters } from './src/store/api';
import app from './src/store/app';
import React from 'react-native';

getRequesters();

app.router(App);

AppRegistry.registerComponent('native', () => app.start());
