import React, { useRef, useState, useEffect } from 'react';
import queryString from 'query-string';
import { getMeetingApi } from '../api';

import MainSideBarContainer from './MainSideBarContainer';
import Detail from '../components/Detail';

const DetailContainer = props => {
  const { history, location } = props;
  const { meetingId } = queryString.parse(location.search);

  const meetingVideo = useRef();
  const [isVideo, setIsVideo] = useState(false);
  const [scriptList, setScriptList] = useState({});
  const [meetingInfo, setMeetingInfo] = useState({});

  useEffect(() => {
    (async () => {
      const resMeeting = await getMeetingApi(meetingId);
      setMeetingInfo(resMeeting.meetingInfo);
    })();
    return setMeetingInfo({});
  }, [meetingId]);

  function setVideoFile(event) {
    const file = event.target.files[0];
    const canPlay = meetingVideo.current.canPlayType(file.type);
    if (canPlay === '') return;

    const fileURL = URL.createObjectURL(file);
    meetingVideo.current.src = fileURL;
    setIsVideo(true);
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
      <MainSideBarContainer history={history} detail />
      <Detail
        isVideo={isVideo}
        meetingInfo={meetingInfo}
        setVideoFile={setVideoFile}
        setJsonFile={setJsonFile}
        meetingVideo={meetingVideo}
        scriptList={scriptList}
      />
    </>
  );
};

export default DetailContainer;
