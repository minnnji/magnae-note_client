import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModeHost, setModeGuest } from '../actions/index';
import { getUserApi } from '../lib/api';
import MainSideBar from '../components/MainSideBar';

const MainSideBarContainer = props => {
  const { detail, history } = props;
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.user._id);
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    if (user_id) {
      (async () => {
        const userInfo = await getUserApi(user_id);
        setMeetingList(userInfo.myMeetings);
      })();
    }
  }, [user_id]);

  return (
    <>
      <MainSideBar
        meetingList={meetingList}
        setModeHost={setModeHost}
        setModeGuest={setModeGuest}
        dispatch={dispatch}
        detail={detail}
        history={history}
      />
    </>
  );
};

export default MainSideBarContainer;
