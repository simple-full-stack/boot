import App from './App';
import { getRequesters } from './store/api';
import app from './store/app';
import * as React from 'react';

getRequesters();

app.router(() => <App />);
