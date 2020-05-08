import React from 'react';
import styled from 'styled-components';
import { BigBlueFilledButton } from './Items/Button';

const Script = props => {
  const { isHost, callerId, text, subText, handleStart, handleStop } = props;
  return (
    <Wrapper>
      {isHost && <BigBlueFilledButton onClick={() => handleStart(callerId)}>회의 시작</BigBlueFilledButton>}
      {isHost && <BigBlueFilledButton onClick={() => handleStop(callerId)}>회의 종료</BigBlueFilledButton>}
      {!isHost && <BigBlueFilledButton onClick={handleStop}>퇴장하기</BigBlueFilledButton>}
      <ScriptWrapper>
        <div>{text}</div>
        <div>{subText}</div>
      </ScriptWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 1em;
  padding: 1em 0;
`;

const ScriptWrapper = styled.div`
  margin: 2em;
`;

export default Script;
