import React from 'react';
import ReactDom from 'react-dom';
import './css/base.css';
import HomePage from './pages/Home';
import WodPage from './pages/Wod';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducers from './reducers/index';
import { BrowserRouter, Route } from 'react-router-dom';

let initialState = {} 
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(reduxPromise)
);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route exact path="/" component={HomePage} />
    </BrowserRouter>
    <BrowserRouter>
    <Route path="/workout/:wodId" component={WodPage} />
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));

