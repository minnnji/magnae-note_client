import * as types from '../constants/actionTypes';
import { getSocket } from '../lib/socket';

export const onUpdateMember = dispatch => {
  const socket = getSocket();
  socket.on('thisRoomUsers', memberList => {
    dispatch({ type: types.UPDATE_MEETING_MEMBER, memberList });
  });
};

export const onReceiveCall = dispatch => {
  const socket = getSocket();
  socket.on('hey', data => {
    dispatch({ type: types.RECEIVE_MEETING_CALL, status: true });
    dispatch({ type: types.SENDING_MEETING_CALL, status: false });
    dispatch({ type: types.RECEIVE_MEETING_CALLER_INFO, data });
  });
};

export const onStartMeeting = (handleStart, dispatch) => {
  const socket = getSocket();
  socket.on('startMeeting', () => {
    handleStart();
    dispatch({ type: types.UPDATE_MEETING_START });
  });
};

export const onStopMeeting = (handleStop, dispatch) => {
  const socket = getSocket();
  socket.on('endMeeting', () => {
    handleStop();
    dispatch({ type: types.UPDATE_MEETING_STOP });
  });
};

export const receivingPeerStream = (stream, dispatch) => {
  dispatch({ type: types.RECEIVE_MEETING_CALLER_STREAM, stream });
};

export const sendingCall = dispatch => {
  dispatch({ type: types.SENDING_MEETING_CALL, status: true });
};

export const acceptingCall = dispatch => {
  dispatch({ type: types.ACCEPTING_MEETING_CALL, status: true });
};

export const setStreamRecorder = (dispatch, status) => {
  dispatch({ type: types.UPDATE_MEETING_RECORDER, status });
};
