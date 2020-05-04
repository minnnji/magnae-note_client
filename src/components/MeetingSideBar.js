import React, { memo, useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Video = styled.video`
  width: 100%;
`;

const MeetingSideBar = props => {
  const {
    stream,
    handleStart,
    handleStop,
    recordedVideo,
    handlePlayRecordedVideo,
    handleDownLoadVideo
  } = props;
  const userVideo = useRef();

  if (userVideo.current && stream) {
    userVideo.current.srcObject = stream;
  }

  return (
    <Meeting-nav>
      <div>
        <div>
          내 영상
          <Video playsInline muted ref={userVideo} autoPlay />
        </div>
      </div>
      <button type="button" onClick={handleStart}>회의 시작</button>
      <button type="button" onClick={handleStop}>회의 종료</button>
      <button type="button" onClick={handlePlayRecordedVideo}>회의 다시보기</button>
      <button type="button" onClick={handleDownLoadVideo}>회의 다운로드</button>
      <Video playsInline ref={recordedVideo} autoPlay />
      <div>
        미팅 상세정보
      </div>
    </Meeting-nav>
  );
};

export default memo(MeetingSideBar);
