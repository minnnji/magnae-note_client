import * as types from '../constants/actionTypes';

const initialState = {
  _id: '',
  title: '',
  creator: '',
  startTime: '',
  endTime: '',
  myStream: '',
  isSendCall: false,
  isReceiveCall: false,
  isAcceptCall: false,
  isMeetingStart: false,
  isMeetingStop: false,
  isMeetingRecord: false,
  memberList: [],
  peerInfo: {
    id: '',
    name: '',
    signal: null,
    stream: null
  }
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
    case types.RECEIVE_MEETING_CALL:
      return {
        ...state,
        isReceiveCall: action.status
      };
    case types.SENDING_MEETING_CALL:
      return {
        ...state,
        isSendCall: action.status
      };
    case types.ACCEPTING_MEETING_CALL:
      return {
        ...state,
        isAcceptCall: action.status
      };
    case types.RECEIVE_MEETING_CALLER_INFO:
      return {
        ...state,
        peerInfo: {
          ...state.peerInfo,
          id: action.data.fromId,
          name: action.data.fromName,
          signal: action.data.signal
        }
      };
    case types.RECEIVE_MEETING_CALLER_STREAM:
      return {
        ...state,
        peerInfo: { ...state.peerInfo, stream: action.stream }
      };
    case types.UPDATE_MEETING_START:
      return {
        ...state,
        isMeetingStart: true
      };
    case types.UPDATE_MEETING_STOP:
      return {
        ...state,
        isMeetingStop: true
      };
    case types.UPDATE_MEETING_RECORDER:
      return {
        ...state,
        isMeetingRecord: action.status
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
    case types.UPDATE_MEETING_MEMBER:
      return {
        ...state,
        memberList: action.memberList
      };
    case types.RECEIVE_MYSTREAM:
      return {
        ...state,
        myStream: action.stream
      };
    default:
      return state;
  }
};

export default meeting;
