import ReactDOM from 'react-dom';
import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import {initialNetworks} from './reducers/networks'
import {createLogger} from 'redux-logger'
import firebaseConfig from './firebase-config'
import App from './App'
import {Provider} from 'react-redux'
import { createEpicMiddleware } from 'redux-observable'
import rootEpic from './epics'

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app"

// Add the Performance Monitoring library
import "firebase/performance"

const epicMiddleware = createEpicMiddleware()

firebase.initializeApp(firebaseConfig);
export const trace = firebase.performance();

// Setting up redux action logging
const logger = createLogger({
  level:'info'
});

//redux
export const initialStore = {
  networks: initialNetworks
}

const store = createStore(rootReducer, initialStore ,applyMiddleware(logger, epicMiddleware));

epicMiddleware.run(rootEpic)

//react 
ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

