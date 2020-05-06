import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import electron from 'electron';
import HeaderContainer from './HeaderContainer';
import MainSideBarContainer from './MainSideBarContainer';
import Detail from '../components/Detail';

const DetailContainer = props => {
  const { history, location } = props;
  const { meetingId } = queryString.parse(location.search);

  const meetingVideo = useRef();
  const [scriptList, setScriptList] = useState({});

  function setVideoFile(event) {
    const file = event.target.files[0];
    const canPlay = meetingVideo.current.canPlayType(file.type);
    if (canPlay === '') return;

    const fileURL = URL.createObjectURL(file);
    meetingVideo.current.src = fileURL;
  }

  function setJsonFile(event) {
    const file = event.target.files[0];
    const fr = new FileReader();
    fr.onload = function () {
      setScriptList(JSON.parse(fr.result).scripts);
    };

    fr.readAsText(file);
  }

  return (
    <>
      <HeaderContainer history={history} />
      <MainSideBarContainer history={history} detail />
      <Detail
        meetingId={meetingId}
        setVideoFile={setVideoFile}
        setJsonFile={setJsonFile}
        meetingVideo={meetingVideo}
        scriptList={scriptList}
      />
    </>
  );
};

export default DetailContainer;
