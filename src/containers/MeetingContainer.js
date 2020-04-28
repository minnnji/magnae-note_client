import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import socketio from 'socket.io-client';
import { connectSocket, disconnectSocket, socketSubscribe, handleCreate } from '../lib/socket';
import Meeting from '../components/Meeting';
import HeaderContainer from './HeaderContainer';
import MeetingSideBar from '../components/MeetingSideBar';

const MeetingContainer = props => {
  const { history, location } = props;
  const { meetingId } = queryString.parse(location.search);

  const user = useSelector(state => state.user);
  const mode = useSelector(state => state.mode.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    connectSocket();
    socketSubscribe(user, dispatch);
    if (mode === 'new') {
      handleCreate(user.name, meetingId);
    }
    return () => disconnectSocket();
  }, []);
  useEffect(() => {

  });

  return (
    <>
      <HeaderContainer history={history} />
      <MeetingSideBar />
      <Meeting {...props} />
    </>
  );
};

export default MeetingContainer;
