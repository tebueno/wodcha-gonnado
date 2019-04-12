import React from 'react';
import ReactDom from 'react-dom';
import './css/base.css';
import HomePage from './pages/Home';
import WodPage from './pages/Wod';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducers from './reducers/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

let initialState = {} 
const store = createStore(
  reducers,
  initialState,
  applyMiddleware(reduxPromise)
);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch> 
      <Route exact path='/' component={HomePage}/>
      <Route exact path='/workout/:wodId' component={WodPage}/>
      </Switch>
  </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));

