import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeContainer from './HomeContainer';
import LoginContainer from './LoginContainer';
import SignInContainer from './SignInContainer';
import MeetingContainer from './MeetingContainer';
import DetailContainer from './DetailContainer';
import GlobalStyle from '../components/GlobalStyle';

const AppContainer = props => (
  <>
    <GlobalStyle />
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/signin" component={SignInContainer} />
      <Route path="/meeting" component={MeetingContainer} />
      <Route path="/myMeeting" component={DetailContainer} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </>
);

export default AppContainer;
