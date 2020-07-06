import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNewMeetingApi, joinMeetingApi } from '../api';

import MainSideBarContainer from './MainSideBarContainer';
import Main from '../components/Main';

const HomeContainer = props => {
  const { history } = props;
  const mode = useSelector(state => state.mode.mode);
  const user_id = useSelector(state => state.user._id);
  const name = useSelector(state => state.user.name);
  const dispatch = useDispatch();

  useEffect(() => {
    const isLogin = localStorage.getItem('user');
    if (!isLogin) history.push('/login');
  }, []);

  return (
    <>
      <MainSideBarContainer history={history} />
      <Main
        mode={mode}
        user_id={user_id}
        name={name}
        dispatch={dispatch}
        createNewMeetingApi={createNewMeetingApi}
        joinMeetingApi={joinMeetingApi}
        history={history}
      />
    </>
  );
};

export default HomeContainer;
