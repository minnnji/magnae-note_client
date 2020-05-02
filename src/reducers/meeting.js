import * as types from '../constants/actionTypes';

const initialState = {
  _id: '',
  title: '',
  myStream: '',
  creator: '',
  peer: '',
  noticeList: [],
  voiceList: []
};

function updateNoticeList(currentList, updateNotice) {
  const updateList = currentList.slice();
  updateList.push(updateNotice);
  return updateList;
}

const meeting = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_MEETING_SUCCESS:
      return {
        ...state,
        _id: action.id,
        title: action.title,
        creator: action.creator,
        peer: '',
        noticeList: [],
        voiceList: []
      };
    case types.JOIN_MEETING_SUCCESS:
      return {
        ...state,
        _id: action._id,
        title: action.title,
        creator: action.creator,
        peer: action.name
      };
    case types.RECEIVE_SOCKET_MESSAGE:
      return {
        ...state,
        noticeList: updateNoticeList(state.noticeList, action.message)
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
