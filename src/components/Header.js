import React from 'react';
import Button from './Items/Button';

const Header = (props) => {
  const { handleLogin, handleLogout, dispatch, user, history } = props;

  return (
    <header>
      {
        user && user.isLogin
          ? <p>{user.name} 님</p>
          : <p>로그인 후 이용해주세요.</p>
      }
      {
        user && user.isLogin
          ? <Button onClick={() => {
              handleLogout(dispatch);
              history.push('/');
            }}>
              Logout
            </Button>
          : <Button blueLine blueText onClick={() => handleLogin(dispatch)}>로그인</Button>
      }
      <Button gray>fail</Button>
    </header>
  );
};

export default Header;
