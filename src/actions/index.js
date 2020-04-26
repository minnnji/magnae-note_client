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

export const setModeNew = () => ({
  type: types.MODE_MEETING_NEW
});

export const setModeJoin = () => ({
  type: types.MODE_MEETING_JOIN
});

export const setNewMeeting = (title, creator) => ({
  type: types.NEW_MEETING_SUCCESS,
  title,
  creator
});
