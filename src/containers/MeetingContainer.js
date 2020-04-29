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
  const [caller, setCaller] = useState('');
  const [peerStream, setPeerStream] = useState('');
  const [callerSignal, setCallerSignal] = useState('');
  const [receivingCall, setreceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);

  useEffect(() => {
    if (stream) {
      (async () => {
        await socket.connectSocket();
        await socket.socketSubscribe(stream, dispatch, setPeerStream, setreceivingCall, setCaller, setCallerSignal, setCallAccepted, caller, callerSignal);
        if (mode === 'new') socket.handleCreateRoom(user.name, meetingId);
        if (stream && mode === 'join') socket.handleJoinRoom(meetingId, setPeerStream, setCallAccepted);

        return () => socket.disconnectSocket();
      })();
    }
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
