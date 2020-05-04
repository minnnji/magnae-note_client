import React, { useRef } from 'react';
import styled from 'styled-components';
import theme from '../constants/theme';

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
  margin: 1em;
  padding: 1em;
  height: 62vh;
  background-color: ${theme.BG_COLOR_3};
  border-radius: .5em;
  color: ${theme.COLOR_WHITE};
  text-align: center;
  line-height: 16em;
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
  if (receivingCall) {
    incomingCall = (
      <div>
        {callerName}
        {' '}
        님이 참석을 원합니다.
        <button type="button" onClick={acceptCall}>수락하기</button>
      </div>
    );
  }

  return (
    <main>
      <div>
        <Container>
          {PartnerVideo
            ? <Row>{PartnerVideo}</Row>
            : incomingCall
              ? <NoVideo>{incomingCall}</NoVideo>
              : <NoVideo>상대방을 기다리는 중입니다.</NoVideo>}
          <Row>
            {!isHost
              && (
                <button type="button" onClick={() => callPeer(mySocket, partnerPeerInfo[1])}>
                  회의 참석하기
                </button>
              )}
          </Row>
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
