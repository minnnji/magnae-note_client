import * as types from '../constants/actionTypes';

const initialState = {
  _id: '',
  title: '',
  creator: '',
  startTime: '',
  endTime: '',
  myStream: '',
  memberList: []
};

const meeting = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_MEETING_SUCCESS:
      return {
        ...state,
        _id: action.id,
        title: action.title,
        creator: action.creator
      };
    case types.JOIN_MEETING_SUCCESS:
      return {
        ...state,
        _id: action._id,
        title: action.title,
        creator: action.creator
      };
    case types.RECEIVE_MEETING_STARTTIME:
      return {
        ...state,
        startTime: action.startTime
      };
    case types.RECEIVE_MEETING_ENDTIME:
      return {
        ...state,
        endTime: action.endTime
      };
    case types.RECEIVE_MEETING_MEMBER:
      return {
        ...state,
        memberList: action.memberList
      };
    case types.RECEIVE_MYSTREAM:
      return {
        ...state,
        myStream: action.stream
      };
    default: return state;
  }
};

export default meeting;
