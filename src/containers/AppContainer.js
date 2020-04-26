import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeContainer from './HomeContainer';
import MeetingContainer from './MeetingContainer';
import GlobalStyle from '../components/GlobalStyle';

const AppContainer = props => (
  <>
    <GlobalStyle />
    <Switch>
      <Route exact path="/" render={props => <HomeContainer {...props} />} />
      <Route path="/meeting" render={props => <MeetingContainer {...props} />} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </>
);

export default AppContainer;
