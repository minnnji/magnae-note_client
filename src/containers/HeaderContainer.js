import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import history from '../lib/history';
import { requestLogout } from '../api';

import Header from '../components/Header';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleLogout = () => {
    const isLogout = window.confirm('로그아웃 하시겠습니까?');
    if (isLogout) {
      requestLogout(dispatch);
      history.push('/login');
    }
  };

  return (
    <Header
      isLogin={user.isLogin}
      name={user.name}
      handleLogout={handleLogout}
    />
  );
};

export default HeaderContainer;
