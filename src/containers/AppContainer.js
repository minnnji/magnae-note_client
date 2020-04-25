import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeContainer from './HomeContainer';

const AppContainer = props => {
  return (
    <Switch>
      <Route exact path="/" render={props => <HomeContainer {...props} />} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default AppContainer;
