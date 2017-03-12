import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Navigation from './features/navigation/Navigation';
import home from './pages/home';
import registration from './pages/registration';
import login from './pages/login';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Navigation}>
          <IndexRoute component={home} />
          <Route path="/registration" component={registration} />
          <Route path="/login" component={login} />
        </Route>
      </Router>
    );
  }
}

export default App;
