import React from 'react';
import styled from 'styled-components';
import theme from '../constants/theme';

const Video = styled.video`
  width: 30em;
  margin: 1.5em;
  border-radius: .5em;
`;

const Script = styled.div`
  cursor: pointer;
  :hover {
    color: ${theme.COLOR_BLUE};
  }
`;

const Main = props => {
  const { setVideoFile, setJsonFile, meetingVideo, scriptList } = props;

  const setVideoTime = time => {
    meetingVideo.current.currentTime = time;
  };

  let scripts;
  if (scriptList.length) {
    scripts = scriptList.map(script => (
      <Script onClick={() => setVideoTime(script.currentTime)}>{script.script}</Script>
    ));
  }

  return (
    <main>
      <h1>4월 3일 스크럼</h1>
      (May 5, 2020 11:09 PM ~ 11:10 PM)
      <form>
        <input type="file" accept="video/*" onChange={setVideoFile.bind(this)} />
        <input type="file" accept="text/plain" onChange={setJsonFile.bind(this)} />
      </form>
      <Video playsInline ref={meetingVideo} autoPlay />
      {scripts && scripts}
    </main>
  );
};

export default Main;
