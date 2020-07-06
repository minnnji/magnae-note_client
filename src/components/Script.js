import React from 'react';
import styled from 'styled-components';
import theme from '../constants/theme';
import { BigBlueFilledButton } from './layout/Button';

const Script = props => {
  const { isHost, isMediaRecorder, callerId, text, subText, handleStart, handleStop } = props;
  return (
    <Wrapper>
      {isHost && !isMediaRecorder && <BigBlueFilledButton onClick={() => handleStart(callerId)}>회의 시작</BigBlueFilledButton>}
      {isHost && isMediaRecorder && <BigBlueFilledButton onClick={() => handleStop(callerId)}>회의 종료</BigBlueFilledButton>}
      {!isHost && <BigBlueFilledButton onClick={handleStop}>퇴장하기</BigBlueFilledButton>}
      {isMediaRecorder || (
        <Notice>
          회의가 시작되면 음성이 인식되어
          <br />
          회의 내용이 자동 기록됩니다.
        </Notice>
      )}
      {isMediaRecorder && <Notice>회의가 시작되었습니다.</Notice>}
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
  margin: 1em 0;
  padding: 10px;
  height: 550px;
  overflow-y: scroll;
  border: 1px dotted ${theme.COLOR_GRAY};
  color: ${theme.COLOR_WHITE};
`;

const Notice = styled.h3`
  margin: 10px;
  color: ${theme.COLOR_BLUE};
`;

export default Script;
