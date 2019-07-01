import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import App from './App';
import {createStore} from 'redux'
import rootReducer from './reducers'
import {initialNetworks} from './reducers/networks';


export const initialStore = {
  networks: initialNetworks
}

const store = createStore(rootReducer, initialStore);

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

