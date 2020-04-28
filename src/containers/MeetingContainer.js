import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import * as socket from '../lib/socket';
import Meeting from '../components/Meeting';
import HeaderContainer from './HeaderContainer';
import MeetingSideBar from '../components/MeetingSideBar';

const MeetingContainer = props => {
  const { history, location } = props;
  const { meetingId } = queryString.parse(location.search);

  const user = useSelector(state => state.user);
  const mode = useSelector(state => state.mode.mode);
  const dispatch = useDispatch();
  const [stream, setStream] = useState('');
  const [peerStream, setPeerStream] = useState('');

  useEffect(() => {
    socket.connectSocket();
    socket.socketSubscribe(user, stream, dispatch, setPeerStream);
    return () => socket.disconnectSocket();
  }, []);

  useEffect(() => {
    if (mode === 'new') socket.handleCreateRoom(user.name, meetingId);
    if (stream && mode === 'join') socket.handleJoinRoom(user.name, meetingId, stream, dispatch, setPeerStream);
  }, [stream]);

  return (
    <>
      <HeaderContainer history={history} />
      <MeetingSideBar setStream={setStream} />
      <Meeting myStream={stream} peerStream={peerStream} />
    </>
  );
};

export default MeetingContainer;
