import React from 'react';
import styled from 'styled-components';
import homeImg from '../assets/homeImg.gif';

const Login = props => (
  <main>
    <div>
      <Img src={homeImg} alt="home image" />
      <Title>
        Magnae-Note와 함께, 누구보다 스마트한
        <br />
        회의 영상 & 회의록을 남겨보세요!
      </Title>
    </div>
  </main>
);

const Img = styled.img`
  position: relative;
  width: 1050px;
  height: fit-content;
`;

const Title = styled.h1`
  position: absolute;
  top: 28%;
  left: 42%;
  text-align: center;
`;

export default Login;
