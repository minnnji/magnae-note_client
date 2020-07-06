import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from './layout/Sidebar';
import Input from './layout/Input';
import { BigButton } from './layout/Button';

const LoginSideBar = props => {
  const { handleLogin } = props;

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const title = <h2>로그인</h2>;

  return (
    <Sidebar topContent={title}>
      <form
        className="chattingForm"
        onSubmit={e => {
          e.preventDefault();
          handleLogin(id, password);
        }}
      >
        <Input
          short
          placeholder="아이디"
          defaultValue={id}
          onChange={e => setId(e.target.value)}
        />
        <Input
          type='password'
          short
          placeholder="비밀번호"
          defaultValue={password}
          onChange={e => setPassword(e.target.value)}
        />
        <BigButton type="submit">로그인하기</BigButton>
      </form>
      <Link to="/signin"><SignIn>회원가입하기 ❯</SignIn></Link>
    </Sidebar>
  );
};

const SignIn = styled.span`
  display: inline-block;
  margin: 10px 0;
`;

export default LoginSideBar;
