import React from 'react';
import Home from '../components/Home/Home';
import HeaderContainer from './HeaderContainer';

const HomeContainer = props => {
  const { history } = props;
  return (
    <>
      <HeaderContainer history={history}/>
      <Home />
    </>
  );
};

export default HomeContainer;
