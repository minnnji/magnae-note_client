import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import theme from '../constants/theme';

const Detail = props => {
  const { isVideo, meetingInfo, setVideoFile, setJsonFile, meetingVideo, scriptList } = props;
  const { memberList, title, startTime, endTime } = meetingInfo;
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
      <DetailHeader>
        <h1>{title}</h1>
        <p>
          {`${moment(startTime).format('LLL')} ~ ${moment(endTime).format('LT')}`}
        </p>
      </DetailHeader>

      <Wrapper>
        <div>
          <form>
            <Fieldset>
              <File
                type="file"
                accept="video/*"
                id="videoFile"
                onChange={setVideoFile.bind(this)}
              />
              <FileLabel htmlFor="videoFile">영상 불러오기</FileLabel>
            </Fieldset>
          </form>
          {isVideo || <NoVideo>[영상 불러오기] 버튼으로 영상파일을 추가해주세요.</NoVideo>}
          <Video playsInline ref={meetingVideo} autoPlay />
        </div>
        <div>
          <form>
            <Fieldset>
              <File type="file" accept="text/plain" id="scriptFile" onChange={setJsonFile.bind(this)} />
              <FileLabel htmlFor="scriptFile">회의록 불러오기</FileLabel>
            </Fieldset>
          </form>
          <h2>Time Travel</h2>
          <ScriptSubTitle>
            [대화탐색] 대화내용을 선택한 구간부터 재생됩니다.
          </ScriptSubTitle>
          <ScriptWrapper>
            {scripts && scripts}
          </ScriptWrapper>
        </div>
      </Wrapper>
    </main>
  );
};

const ScriptSubTitle = styled.p`
  margin-bottom: 20px;
  color: ${theme.BG_COLOR_1};
`;

const ScriptWrapper = styled.div`
  overflow-y: scroll;
`;

const DetailHeader = styled.div`
  padding-bottom: 20px;
  margin: 30px 0;
  text-align: center;
  border-bottom: 1px solid;
`;

const Wrapper = styled.div`
  display: flex;

  & > div {
    flex: 1;

    &:first-child {
      margin-right: 30px;
    }
  }
`;

const Video = styled.video`
  border-radius: .5em;
  width: 100%;
`;

const NoVideo = styled.div`
  display: flex;
  height: 20em;
  align-items: center;
  padding: 1em;
  background-color: ${theme.BG_COLOR_3};
  border-radius: .5em;
  color: ${theme.COLOR_WHITE};
  text-align: center;
  line-height: 2em;
  font-size: 1em;
`;

const Script = styled.p`
  margin-bottom: 10px;
  cursor: pointer;
  word-break: keep-all;
  :hover {
    color: ${theme.COLOR_BLUE};
  }
`;

const Fieldset = styled.fieldset`
  text-align: right;
  border: 0;
  padding: 0;
  margin-bottom: 15px;
`;

const File = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  display: inline-block;
  padding: .5em 1em;
  width: fit-content;
  background-color: #1f73b7;
  border-radius: .5em;
  color: ${theme.COLOR_WHITE};
  cursor: pointer;
  : hover{
    color: #ffffff !important;
    background: ${theme.COLOR_BLUE};
    transition: all 0.3s ease 0s;
  }
`;

export default Detail;
