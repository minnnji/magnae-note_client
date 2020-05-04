import React from 'react';
import styled from 'styled-components';
import { BigButton, BigBlueFilledButton } from './Items/Button';

const SideBarTop = styled.div`
  margin: 1.5em 0;
  text-align: center;
`;

const SideBarBottom = styled.div`
  float: right;
  margin: .5em;
`;

const MainSideBar = props => {
  const { setModeHost, setModeGuest, dispatch } = props;
  return (
    <Main-nav>
      <SideBarTop>
        <BigBlueFilledButton onClick={() => dispatch(setModeHost())}>새 회의실 만들기</BigBlueFilledButton>
        <BigButton onClick={() => dispatch(setModeGuest())}>회의 참여하기</BigButton>
      </SideBarTop>
      <SideBarBottom>
        나의 회의록
      </SideBarBottom>
    </Main-nav>
  );
};

export default MainSideBar;
