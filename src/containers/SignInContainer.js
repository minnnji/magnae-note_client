import React from 'react';
import { requestSignin } from '../api';

import SignInSideBar from '../components/SignInSideBar';
import Login from '../components/Login';

const SignInContainer = props => {
  const { history } = props;

  const handleSignin = async (name, id, password) => {
    const response = await requestSignin(name, id, password);

    if (response === 'ok') alert('가입이 완료되었습니다. 로그인 후 이용해주시기 바랍니다.');
    history.push('/login');
  };

  return (
    <>
      <SignInSideBar handleSignin={handleSignin} />
      <Login />
    </>
  );
};

export default SignInContainer;
