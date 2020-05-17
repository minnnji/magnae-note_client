import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Input from './Items/Input';
import { BigButton } from './Items/Button';

const SignInSideBar = props => {
  const { handleSignin } = props;
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [name, setName] = useState('');

  return (
    <Main-nav>
      <SideBarTop>
        <h2>회원가입</h2>
      </SideBarTop>
      <SideBarBottom>
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
            short
            placeholder="비밀번호"
            defaultValue={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Input
            short
            placeholder="비밀번호확인"
            defaultValue={passwordCheck}
            onChange={e => setPasswordCheck(e.target.value)}
          />
          <BigButton type="submit">가입하기</BigButton>
        </form>
        <Link to="/login"><SignIn>이미 가입하신 경우, 로그인해주세요!</SignIn></Link>
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

export default SignInSideBar;
