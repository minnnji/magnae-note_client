import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeContainer from './HomeContainer';
import GlobalStyle from '../components/GlobalStyle';

const AppContainer = props => {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" render={props => <HomeContainer {...props} />} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </>
  );
};

export default AppContainer;
