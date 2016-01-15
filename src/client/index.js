
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import AppComponent from './components/app';
import { routes } from '../routes';

import createBrowserHistory from 'history/lib/createBrowserHistory';

ReactDOM.render(
  <Router routes={routes} history={createBrowserHistory()} />,
  document.getElementById('app')
)
