import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
`;

const MeetingSideBar = props => {
  const { setStream } = props;
  const userVideo = useRef();

  useEffect(() => {
    navigator.getWebcam = (navigator.getUserMedia
      || navigator.webKitGetUserMedia
      || navigator.moxGetUserMedia
      || navigator.mozGetUserMedia
      || navigator.msGetUserMedia);

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(stream => {
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        })
        .catch(e => { console.log(`${e.name}: ${e.message}`); });
    } else {
      navigator.getWebcam({ audio: true, video: true },
        stream => {
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        },
        () => { console.log('Web cam is not accessible.'); });
    }
  }, []);

  return (
    <nav>
      <div>
        <div>
          내 영상
          <Video playsInline muted ref={userVideo} autoPlay />
        </div>
      </div>
      <div>
        미팅 상세정보
      </div>
    </nav>
  );
};

export default MeetingSideBar;
