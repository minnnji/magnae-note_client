import * as types from '../constants/actionTypes';

const initialState = {
  name: null,
  email: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    // case types.LOGIN_REQUEST:
    //   return {
    //     ...state
    //   };
    default: return state;
  }
};

export default user;
