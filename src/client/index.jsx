
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import AppComponent from './containers/app';
import { routes } from '../routes';

import createBrowserHistory from 'history/lib/createBrowserHistory';
import createHistory from 'history/lib/createHashHistory';

ReactDOM.render(
  <Router
    routes={routes}
    history={createBrowserHistory()}
    onUpdate={() => window.scrollTo(0, 0)} >
  </Router>,
  document.getElementById('app')
)
