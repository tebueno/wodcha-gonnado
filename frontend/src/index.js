import React from 'react';
import ReactDom from 'react-dom';
import './css/base.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducers from './reducers/index';

let initialState = {} 
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(reduxPromise)
);

ReactDom.render(<Provider store={store}><App/></Provider>, document.querySelector('#root'));

