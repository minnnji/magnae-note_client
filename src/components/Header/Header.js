import React from 'react';

const Header = (props) => {
  const { handleLogin, handleLogout, dispatch, user, history } = props;

  return (
    <div className="App">
      {
        user && user.isLogin
          ? <p>{user.name} 님</p>
          : <p>로그인 후 이용해주세요.</p>
      }
      {
        user && user.isLogin
          ? <button onClick={() => {
              handleLogout(dispatch);
              history.push('/');}}>
                Logout
            </button>
          : <button onClick={() => handleLogin(dispatch)}>Login</button>
      }
    </div>
  );
};

export default Header;
