import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
`;

const MeetingSideBar = props => {
  const { setStream } = props;
  const userVideo = useRef();

  useEffect(() => {
    (async () => {
      navigator.getWebcam = (navigator.getUserMedia
        || navigator.webKitGetUserMedia
        || navigator.moxGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia);
      if (navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const stream = await navigator.getWebcam({ audio: true, video: true });
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        } catch (err) {
          console.log('Web cam is not accessible.');
        }
      }
    })();
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
