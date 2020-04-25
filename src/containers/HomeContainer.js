import React from 'react';
import Main from '../components/Main';
import HeaderContainer from './HeaderContainer';
import LnbContainer from './LnbContainer';

const HomeContainer = props => {
  const { history } = props;
  return (
    <>
      <HeaderContainer history={history}/>
      <LnbContainer />
      <Main />
    </>
  );
};

export default HomeContainer;
