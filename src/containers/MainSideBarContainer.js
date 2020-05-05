import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModeHost, setModeGuest } from '../actions/index';
import { getUserApi } from '../lib/api';
import MainSideBar from '../components/MainSideBar';

const MainSideBarContainer = props => {
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.user._id);
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    (async () => {
      const userInfo = await getUserApi(user_id);
      setMeetingList(userInfo.myMeetings);
    })();
  }, []);

  return (
    <>
      <MainSideBar
        meetingList={meetingList}
        setModeHost={setModeHost}
        setModeGuest={setModeGuest}
        dispatch={dispatch}
      />
    </>
  );
};

export default MainSideBarContainer;
