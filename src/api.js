import axios from 'axios';
import { deleteUser, createMeeting, joinMeeting } from './actions/index';

export const setHeader = () => {
  const jwtToken = localStorage.getItem('user');
  return { headers: { Authorization: `Bearer ${jwtToken}` } };
};

export const requestSignin = async (name, id, password) => {
  try {
    const resSignin = await axios.post(`${process.env.REACT_APP_SERVER}/auth/signin`,
      { name,
        id,
        password });

    return resSignin.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const requestLogin = async (userId, password) => {
  try {
    const resLogin = await axios.post(`${process.env.REACT_APP_SERVER}/auth/login`,
      { id: userId,
        password });

    return resLogin.data;
  } catch (err) {
    return alert(err.response.data.message);
  }
};

export const handleLogout = async dispatch => {
  localStorage.setItem('user', '');
  dispatch(deleteUser());
};

export const getUserApi = async (userId, history) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER}/users/${userId}`, setHeader());
    return response.data.userById;
  } catch (err) {
    alert(err.response.data.message);
    if (err.response.status === 401) return history.push('/login');
  }
};

export const updateUserApi = async (userId, meetingId) => {
  try {
    await axios.put(`${process.env.REACT_APP_SERVER}/users/${userId}`, {
      meetingId
    }, setHeader());
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const createNewMeetingApi = async (title, password, user_id, name, dispatch) => {
  const newMeeting = await axios.post(`${process.env.REACT_APP_SERVER}/meetings`,
    { title,
      password,
      creator: user_id }, setHeader());
  dispatch(createMeeting(newMeeting.data.meetingId, title, name));
  return newMeeting.data.meetingId;
};

export const getMeetingApi = async meetingId => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER}/meetings/${meetingId}`, setHeader());
    return response.data;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
};

export const joinMeetingApi = async (title, password, name, dispatch) => {
  try {
    const meetingRes = await axios.post(`${process.env.REACT_APP_SERVER}/meetings/validation`, {
      title, password }, setHeader());
    dispatch(joinMeeting(meetingRes.data.meetingInfo, name));
    return meetingRes.data.meetingInfo;
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
};

export const updateMeetingApi = async (meetingId, startTime, endTime, memberList) => {
  try {
    await axios.put(`${process.env.REACT_APP_SERVER}/meetings/${meetingId}`, {
      startTime, endTime, memberList
    }, setHeader());
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
};
