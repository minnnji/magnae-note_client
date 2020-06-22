import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomeContainer from './containers/HomeContainer';
import LoginContainer from './containers/LoginContainer';
import SignInContainer from './containers/SignInContainer';
import MeetingContainer from './containers/MeetingContainer';
import DetailContainer from './containers/DetailContainer';
import GlobalStyle from './components/GlobalStyle';

import dotenv from 'dotenv';
dotenv.config();

const App = () => (
  <HashRouter>
    <GlobalStyle />
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signin" component={SignInContainer} />
      <Route path="/meeting" component={MeetingContainer} />
      <Route path="/myMeeting" component={DetailContainer} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </HashRouter>
);

export default App;
