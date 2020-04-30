import React, { useRef } from 'react';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
`;

const Meeting = props => {
  const { peerStream } = props;
  const peerVideo = useRef();
  console.log('Meeting comp:', peerStream);

  if (peerStream && peerVideo.current) {
    peerVideo.current.srcObject = peerStream;
  }

  return (
    <main>
      { !peerStream && 'Loading..' }
      <div>
        <Video playsInline ref={peerVideo} autoPlay />
      </div>
      <div>
        스크립트
      </div>
    </main>
  );
};

export default Meeting;
