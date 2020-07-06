import React from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../actions/index';
import { requestLogin } from '../api';

import LoginSideBar from '../components/LoginSideBar';
import Login from '../components/Login';

const LoginContainer = props => {
  const { history } = props;
  const dispatch = useDispatch();

  const handleLogin = async (id, password) => {
    try {
      const { jwtToken, payload } = await requestLogin(id, password);

      localStorage.setItem('user', jwtToken);
      dispatch(getUser(payload.id, payload.name, payload._id));
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <LoginSideBar handleLogin={handleLogin} />
      <Login />
    </>
  );
};

export default LoginContainer;
