import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
`;

const MeetingSideBar = props => {
  const { stream } = props;
  const userVideo = useRef();

  if (userVideo.current) {
    userVideo.current.srcObject = stream;
  }

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
