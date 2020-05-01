import React, { useRef } from 'react';
import styled from 'styled-components';

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

const Video = styled.video`
  width: 100%;
`;

const Meeting = props => {
  const {
    mySocket,
    isHost,
    receivingCall,
    callerName,
    partnerPeerInfo,
    partnerVideo,
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
        <h1>
          {callerName}
          {' '}
          님이 참석을 원합니다.
        </h1>
        <button onClick={acceptCall}>수락하기</button>
      </div>
    );
  }

  return (
    <main>
      <div>
        <Container>
          <Row>
            {PartnerVideo}
          </Row>
          <Row>
            {!isHost
              && (
                <button onClick={() => callPeer(mySocket, partnerPeerInfo[1])}>
                  회의 참석하기
                </button>
              )}
          </Row>
          <Row>
            {incomingCall}
          </Row>
        </Container>
      </div>
      <div>
        스크립트
      </div>
    </main>
  );
};

export default Meeting;
