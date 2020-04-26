import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Meeting from '../components/Meeting';
import HeaderContainer from './HeaderContainer';
import MeetingSideBar from '../components/MeetingSideBar';

const MeetingContainer = props => {
  const { history } = props;

  return (
    <>
      <HeaderContainer history={history} />
      <MeetingSideBar />
      <Meeting {...props} />
    </>
  );
};

export default MeetingContainer;
