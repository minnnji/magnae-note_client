import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import dotenv from 'dotenv';
import history from './lib/history';

import HeaderContainer from './containers/HeaderContainer';
import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import SignInContainer from './containers/SignInContainer';
import MeetingContainer from './containers/MeetingContainer';
import DetailContainer from './containers/DetailContainer';
import GlobalStyle from './components/GlobalStyle';

dotenv.config();

const App = () => (
  <Router history={history}>
    <GlobalStyle />
    <HeaderContainer />
    <Switch>
      <Route exact path='/' component={HomeContainer} />
      <Route path='/login' component={LoginContainer} />
      <Route path='/signin' component={SignInContainer} />
      <Route path='/meeting' component={MeetingContainer} />
      <Route path='/myMeeting' component={DetailContainer} />
      <Route render={() => <Redirect to='/' />} />
    </Switch>
  </Router>
);

export default App;
