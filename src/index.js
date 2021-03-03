import React from 'react';
import ReactDOM from 'react-dom';
import SignUp from './SignUp';
import SignInSide from './SignInSide';
import Search from './Search';
import MyBookShelf from './MyBookShelf';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path="/" component={SignInSide}></Route>
      <Route path="/SignUp" component={SignUp}></Route>
      <Route path="/Search" component={Search}></Route>
      <Route path="/MyBookShelf" component={MyBookShelf}></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
