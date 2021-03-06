import React from 'react';
import styled from 'styled-components';
import theme from '../constants/theme';
import { BigButton } from './layout/Button';
import Script from './Script';

const Meeting = props => {
  const {
    mySocket,
    isHost,
    sendingCall,
    receivingCall,
    isMediaRecorder,
    callerName,
    callerId,
    memberList,
    partnerVideo,
    callAccepted,
    acceptCall,
    callPeer,
    text,
    subText,
    handleStart,
    handleStop
  } = props;

  let incomingCall;
  if (!receivingCall) {
    incomingCall = (
      <NoVideo>
        상대방을 기다리는 중 입니다.
      </NoVideo>
    );
  } else if (!callAccepted && receivingCall) {
    incomingCall = (
      <NoVideo>
        {callerName}
        {' '}
        님이 참석을 원합니다.
        <BigButton onClick={acceptCall}>수락하기</BigButton>
      </NoVideo>
    );
  }

  let outGoingCall;
  if (!sendingCall && memberList.length) {
    outGoingCall = (
      <NoVideo>
        {memberList[0][0]}
        님 에게
        <BigButton onClick={() => callPeer(mySocket, memberList[0][1])}>수락 요청하기</BigButton>
      </NoVideo>
    );
  } else if (sendingCall && !callAccepted) {
    outGoingCall = (
      <NoVideo>수락을 기다리는 중입니다.</NoVideo>
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video playsInline ref={partnerVideo} autoPlay />
    );
  }

  return (
    <Meeting-main>
      <div>
        <VideoContainer>
          {isHost
            && incomingCall}
          {isHost
            || outGoingCall }
          {PartnerVideo}
        </VideoContainer>
        <TextContainer>
          <p>* 회의 참여자간의 확인절차 후, 화상 연결이 이루어집니다.</p>
          {' '}
          <SubText>참여자가 회의실에 들어온 경우, '수락 요청하기'버튼을 선택합니다.</SubText>
          <SubText>회의 주최자는 상대방을 확인 후, '수락하기'버튼을 선택합니다.</SubText>
          <br />
          <p>* 주최자가 우측의 '회의 시작하기' 버튼을 선택하면 음성을 인식하여 자동으로 회의록이 작성됩니다.</p>
          <br />
          <p>* 회의가 종료되면, 본인의 영상파일과 회의록 파일을 저장할 수 있습니다.</p>
          <SubText>이후 상세페이지에서 회의록 파일을 통해 Time Travel 기능으로 간편하게 회의내용을 다시 확인할 수 있습니다.</SubText>
        </TextContainer>
      </div>
      <div>
        <Script
          isHost={isHost}
          isMediaRecorder={isMediaRecorder}
          text={text}
          subText={subText}
          callerId={callerId}
          handleStart={handleStart}
          handleStop={handleStop}
        />
      </div>
    </Meeting-main>
  );
};

const VideoContainer = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
`;

const NoVideo = styled.div`
  display: flex;
  align-items: center;
  margin: 1em;
  padding: 1em;
  height: 62vh;
  background-color: ${theme.BG_COLOR_3};
  border-radius: .5em;
  color: ${theme.COLOR_WHITE};
  text-align: center;
  line-height: 2em;
  font-size: 1.5em;
`;

const Video = styled.video`
  width: -webkit-fill-available;
  margin: 1.5em;
  border-radius: .5em;
`;

const TextContainer = styled.div`
  margin: 0 2em;
  color: ${theme.COLOR_WHITE};
`;

const SubText = styled.p`
  margin: 5px 10px;
  color: ${theme.COLOR_GRAY};
  font-size: 15px;
`;

export default Meeting;
