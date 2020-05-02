import * as types from '../constants/actionTypes';

const initialState = {
  mode: 'host'
};

const mode = (state = initialState, action) => {
  switch (action.type) {
    case types.MODE_MEETING_HOST:
      return {
        ...state,
        mode: 'host'
      };
    case types.MODE_MEETING_GUEST:
      return {
        ...state,
        mode: 'guest'
      };
    default: return state;
  }
};

export default mode;
