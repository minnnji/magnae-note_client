import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Input from './Items/Input';
import { BigButton } from './Items/Button';

const LoginSideBar = props => {
  const { handleLogin } = props;
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Main-nav>
      <SideBarTop>
        <h2>로그인</h2>
      </SideBarTop>
      <SideBarBottom>
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
            short
            placeholder="비밀번호"
            defaultValue={password}
            onChange={e => setPassword(e.target.value)}
          />
          <BigButton type="submit">로그인하기</BigButton>
        </form>
        <Link to="/signin"><SignIn>회원가입하기 ❯</SignIn></Link>
      </SideBarBottom>
    </Main-nav>
  );
};

const SideBarTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 1.5em 0;
  text-align: center;
`;

const SideBarBottom = styled.div`
  margin: 1em 1.5em;
  height: 27em;
  float: right;
`;

const SignIn = styled.span`
  display: inline-block;
  margin: 10px 0;
`;

export default LoginSideBar;
