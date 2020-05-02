import * as types from '../constants/actionTypes';

export const getUser = (email, name, _id) => ({
  type: types.LOGIN_SUCCESS,
  email,
  name,
  _id
});

export const deleteUser = () => ({
  type: types.LOGOUT_SUCCESS
});

export const setModeHost = () => ({
  type: types.MODE_MEETING_HOST
});

export const setModeGuest = () => ({
  type: types.MODE_MEETING_GUEST
});

export const createMeeting = (id, title, creator) => ({
  type: types.CREATE_MEETING_SUCCESS,
  id,
  title,
  creator
});

export const joinMeeting = (meetingInfo, name) => ({
  type: types.JOIN_MEETING_SUCCESS,
  _id: meetingInfo._id,
  title: meetingInfo.title,
  creator: meetingInfo.creator,
  name
});

export const receiveNotice = message => ({
  type: types.RECEIVE_SOCKET_MESSAGE,
  message
});

export const receiveMyStream = stream => ({
  type: types.RECEIVE_MYSTREAM,
  stream
});
