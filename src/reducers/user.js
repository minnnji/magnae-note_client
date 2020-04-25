import * as types from '../constants/actionTypes';

const initialState = {
  name: '',
  email: '',
  isLogin: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        name: action.name,
        email: action.email,
        isLogin: true
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        name: '',
        email:'',
        isLogin: false
      };
    default: return state;
  }
};

export default user;
