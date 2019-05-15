import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducers from 'reducers';
import HomePage from 'pages/Home';
import WodPage from 'pages/Wod';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default ({ children }) => {
    const store = createStore(
      reducers,
      applyMiddleware(reduxPromise)
    );
  
    return <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/workout/:wodId' component={WodPage} />
      </Switch>
    </BrowserRouter>
    {children}</Provider>;
};