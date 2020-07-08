import React, { memo, useRef } from 'react';
import styled from 'styled-components';
import voiceRecogImg from '../assets/voiceRecogImg.gif';

const MeetingSideBar = props => {
  const { myStream, meetingInfo, isMediaRecorder } = props;
  const userVideo = useRef();

  if (userVideo.current && myStream) {
    userVideo.current.srcObject = myStream;
  }

  return (
    <nav>
      <div>
        <Video playsInline muted ref={userVideo} autoPlay />
      </div>
      <MeetingInfo>
        <MeetingTitle>{meetingInfo.title}</MeetingTitle>
        <br />
        <h3>회의 주최자 : {meetingInfo.creator}</h3>
      </MeetingInfo>
      <Img
        isMediaRecorder={isMediaRecorder}
        src={voiceRecogImg}
        alt='in progress'
      />
    </nav>
  );
};

const Video = styled.video`
  width: 100%;
  height: -webkit-fill-available;
`;

const MeetingInfo = styled.div`
  margin: 0 20px;
`;

const MeetingTitle = styled.h2`
  margin-bottom: 10px;
`;

const Img = styled.img`
  display: ${props => (props.isMediaRecorder ? 'block' : 'none')};
  width: 100%;
`;

export default memo(MeetingSideBar);
