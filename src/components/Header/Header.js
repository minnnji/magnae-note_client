import React from 'react';

const Header = (props) => {
  const { handleLogin, handleLogout, user, history } = props;

  return (
    <div className="App">
      {
        user
          ? <p>{user} 님</p>
          : <p>로그인 후 이용해주세요.</p>
      }
      {
        user
          ? <button onClick={() => {
              handleLogout();
            history.push('/');}
          }>Logout</button>
          : <button onClick={handleLogin}>Login</button>
      }
    </div>
  );
};

export default Header;
