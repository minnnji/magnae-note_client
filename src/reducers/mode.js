import * as types from '../constants/actionTypes';

const initialState = {
  mode: 'new'
};

const mode = (state = initialState, action) => {
  switch (action.type) {
    case types.MODE_MEETING_NEW:
      return {
        ...state,
        mode: 'new'
      };
    case types.MODE_MEETING_JOIN:
      return {
        ...state,
        mode: 'join'
      };
    default: return state;
  }
};

export default mode;
