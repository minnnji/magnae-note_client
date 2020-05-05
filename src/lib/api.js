import axios from 'axios';
import firebase from 'firebase';

import firebaseConfig from '../config/firebase';
import { getUser, deleteUser, createMeeting, joinMeeting } from '../actions/index';
import message from '../constants/messages';

const setHeader = jwtToken => {
  if (jwtToken) {
    return axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
  }

  delete axios.defaults.headers.common.Authorization;
};

export const handleLogin = async dispatch => {
  const provider = new firebase.auth.GithubAuthProvider();

  firebase.initializeApp(firebaseConfig);
  try {
    const { user } = await firebase.auth().signInWithPopup(provider);
    const { email, displayName } = user;
    const authResult = await axios.post('https://localhost:4000/api/auth/login', { email, name: displayName });
    const userInfo = authResult.data.payload;

    setHeader(authResult.data.jwtToken);
    console.log(authResult.data.jwtToken);
    dispatch(getUser(userInfo.email, userInfo.name, userInfo._id));
  } catch (err) {
    alert(message.loginError);
    console.warn(err);
  }
};

export const handleLogout = async dispatch => {
  setHeader();
  dispatch(deleteUser());
};

export const getUserApi = async userId => {
  try {
    const response = await axios.get(`https://localhost:4000/api/users/${userId}`);
    return response.data.userById;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
};

export const updateUserApi = async (userId, meetingId) => {
  try {
    await axios.put(`https://localhost:4000/api/users/${userId}`, {
      meetingId
    });
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
};

export const createNewMeetingApi = async (title, password, user_id, name, dispatch) => {
  const newMeeting = await axios.post('https://localhost:4000/api/meetings',
    { title,
      password,
      creator: user_id });
  dispatch(createMeeting(newMeeting.data.meetingId, title, name));
  return newMeeting.data.meetingId;
};

export const joinMeetingApi = async (title, password, name, dispatch) => {
  try {
    const meetingRes = await axios.post('https://localhost:4000/api/meetings/validation', {
      title, password });
    dispatch(joinMeeting(meetingRes.data.meetingInfo, name));
    return meetingRes.data.meetingInfo;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
};

export const updateMeetingApi = async (meetingId, startTime, endTime, memberList) => {
  try {
    await axios.put(`https://localhost:4000/api/meetings/${meetingId}`, {
      startTime, endTime, memberList
    });
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
};
