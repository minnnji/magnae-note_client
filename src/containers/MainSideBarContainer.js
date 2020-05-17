import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModeHost, setModeGuest } from '../actions/index';
import { getUserApi } from '../api';
import MainSideBar from '../components/MainSideBar';

const MainSideBarContainer = props => {
  const { detail, history } = props;
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.user._id);
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    if (user_id) {
      (async () => {
        try {
          const { myMeetings } = await getUserApi(user_id, history);
          setMeetingList(myMeetings);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [user_id]);

  return (
    <>
      <MainSideBar
        isLogin={user_id}
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
