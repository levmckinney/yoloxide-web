import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import {initialNetworks} from './reducers/networks';
import {createLogger} from 'redux-logger'
import firebaseConfig from './firebase-config';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";

// Add the Performance Monitoring library
import "firebase/performance";


firebase.initializeApp(firebaseConfig);
firebase.performance();

// Setting up redux action logging
const logger = createLogger({
  level:'info'
});

//redux
export const initialStore = {
  networks: initialNetworks
}

const store = createStore(rootReducer, initialStore ,applyMiddleware(logger));

//react
ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

