import React, { useRef } from 'react';
import styled from 'styled-components';
import theme from '../constants/theme';
import { BigButton } from './Items/Button';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
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

const Meeting = props => {
  const {
    mySocket,
    isHost,
    sendingCall,
    receivingCall,
    callerName,
    partnerPeerInfo,
    partnerVideo,
    text,
    subText,
    callAccepted,
    acceptCall,
    callPeer
  } = props;

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video playsInline ref={partnerVideo} autoPlay />
    );
  }

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
  if (!sendingCall) {
    outGoingCall = (
      <NoVideo>
        {partnerPeerInfo[0]}
        님 에게
        <BigButton onClick={() => callPeer(mySocket, partnerPeerInfo[1])}>수락 요청하기</BigButton>
      </NoVideo>
    );
  } else if (sendingCall && !callAccepted) {
    outGoingCall = (
      <NoVideo>수락을 기다리는 중입니다.</NoVideo>
    );
  }

  return (
    <main>
      <div>
        <Container>
          {isHost
            && incomingCall}
          {isHost
            || outGoingCall }
          {PartnerVideo}
        </Container>
      </div>
      <div>
        <div>{text}</div>
        <div>{subText}</div>
      </div>
    </main>
  );
};

export default Meeting;
