import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import { handleLogin, handleLogout } from '../lib/api';

const HeaderContainer = props => {
  const { history } = props;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  return (
    <Header
      history={history}
      user={user}
      handleLogin={handleLogin}
      handleLogout={handleLogout}
      dispatch={dispatch} />
  );
};

export default HeaderContainer;