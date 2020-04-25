import * as types from '../constants/actionTypes';

export const getUser = (email, displayName) => {
  return {
    type: types.LOGIN_SUCCESS,
    email,
    name: displayName
  };
};

export const deleteUser = () => {
  return {
    type: types.LOGOUT_SUCCESS
  };
};
