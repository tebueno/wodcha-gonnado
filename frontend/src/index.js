import React from 'react';
import ReactDom from 'react-dom';
import 'css/base.css';
import HomePage from 'pages/Home';
import WodPage from 'pages/Wod';
import Root from 'Root';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDom.render(
  <Root>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/workout/:wodId' component={WodPage} />
      </Switch>
    </BrowserRouter>
  </Root>,
  document.querySelector('#root')
);
