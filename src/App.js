import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Navigation from './features/navigation/Navigation';
import Home from './pages/Home';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';

import './App.css';

export default () => (
  <Router history={browserHistory}>
    <Route path="/" component={Navigation}>
      <IndexRoute component={Home} />
      <Route path="registration" component={Registration} />
      <Route path="login" component={Login} />
      <Route path="profile" component={Profile} />
      <Route path="search" component={Search} />
    </Route>
  </Router>
);
