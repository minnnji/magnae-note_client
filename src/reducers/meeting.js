import * as types from '../constants/actionTypes';

const initialState = {
  title: '',
  creator: ''
};

const meeting = (state = initialState, action) => {
  switch (action.type) {
    case types.NEW_MEETING_SUCCESS:
      return {
        ...state,
        title: action.title,
        creator: action.creator
      };
    default: return state;
  }
};

export default meeting;
