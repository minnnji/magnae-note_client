import * as types from '../constants/actionTypes';

export const getUser = (email, name, _id) => {
  return {
    type: types.LOGIN_SUCCESS,
    email,
    name,
    _id
  };
};

export const deleteUser = () => {
  return {
    type: types.LOGOUT_SUCCESS
  };
};

export const setModeNew = () => {
  return {
    type: types.MODE_MEETING_NEW
  };
};

export const setModeJoin = () => {
  return {
    type: types.MODE_MEETING_JOIN
  };
};

export const setNewMeeting = (title, creator) => {
  return {
    type: types.NEW_MEETING_SUCCESS,
    title,
    creator
  };
};
