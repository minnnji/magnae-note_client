import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Main from '../components/Main';
import HeaderContainer from './HeaderContainer';
import MainSideBarContainer from './MainSideBarContainer';
import { createNewMeeting } from '../lib/api';

const HomeContainer = props => {
  const { history, location } = props;
  const mode = useSelector(state => state.mode.mode);
  const user_id = useSelector(state => state.user._id);
  const name = useSelector(state => state.user.name);
  const dispatch = useDispatch();

  return (
    <>
      <HeaderContainer history={history} />
      <MainSideBarContainer />
      <Main
        mode={mode}
        user_id={user_id}
        name={name}
        createNewMeeting={createNewMeeting}
        dispatch={dispatch}
        history={history}
        location={location}
      />
    </>
  );
};

export default HomeContainer;
