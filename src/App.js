import "./App.css";
import React from 'react';
import { Route } from 'react-router-dom';

import Layout from "./container/Layout/Layout";

import Login from './container/Login/Login';
import CalendarBuilder from './container/CalendarBuilder/CalendarBuilder';
import SignUp from './container/SignUp/SignUp';
import Toolbar from './container/Toolbar/Toolbar';
import Profile from './container/UserProfile/UserProfile';
import Quiz from './container/Quiz/Quiz';

class App extends React.Component {

  render() {
    return (
      <div className='App'>
        <Layout>
          <Route path='/' exact component={Login} />
          <Route path='/calendar' component={Toolbar} />
          <Route path='/calendar' component={CalendarBuilder} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/profile' component={Profile} />
          <Route path='/quiz' component={Quiz} />
        </Layout>
      </div>
    );
  }
}

export default App;
