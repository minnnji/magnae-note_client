import React, { useRef } from 'react';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
`;

const Meeting = props => {
  const { peerStream } = props;
  const peerVideo = useRef();

  if (peerStream && peerVideo.current) {
    peerVideo.current.srcObject = peerStream;
  }

  return (
    <main>
      <div>
        <Video playsInline muted ref={peerVideo} autoPlay />
      </div>
      <div>
        스크립트
      </div>
    </main>
  );
};

export default Meeting;
