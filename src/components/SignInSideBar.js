import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Sidebar from './layout/Sidebar';
import Input from './layout/Input';
import { BigButton } from './layout/Button';

const SignInSideBar = props => {
  const { handleSignin } = props;

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');

  const title = <h2>회원가입</h2>;

  return (
    <Sidebar topContent={title}>
      <form
        className="chattingForm"
        onSubmit={e => {
          e.preventDefault();
          handleSignin(name, id, password);
        }}
      >
        <Input
          short
          placeholder="이름"
          defaultValue={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          short
          placeholder="아이디"
          defaultValue={id}
          onChange={e => setId(e.target.value)}
        />
        <Input
          type="password"
          short
          placeholder="비밀번호"
          defaultValue={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          type="password"
          short
          placeholder="비밀번호확인"
          defaultValue={passwordCheck}
          onChange={e => setPasswordCheck(e.target.value)}
        />
        <BigButton type="submit">가입하기</BigButton>
      </form>
      <Link to="/login"><SignIn>이미 가입하신 경우, 로그인해주세요!</SignIn></Link>
    </Sidebar>
  );
};

const SignIn = styled.span`
  display: inline-block;
  margin: 10px 0;
`;

export default SignInSideBar;
