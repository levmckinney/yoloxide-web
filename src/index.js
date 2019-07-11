import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import App from './App';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducers'
import {initialNetworks} from './reducers/networks';
import {createLogger} from 'redux-logger'

const logger = createLogger({
  level:'info'
});

export const initialStore = {
  networks: initialNetworks
}

const store = createStore(rootReducer, initialStore ,applyMiddleware(logger));

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

