import axios from 'axios';
import firebase from 'firebase';

import firebaseConfig from '../config/firebase';
import { getUser, deleteUser } from '../actions/index';
import message from '../constants/messages';

const setHeader = (jwtToken)=> {
  if (jwtToken) {
    return axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  }

  delete axios.defaults.headers.common['Authorization'];
};

export const handleLogin = async dispatch => {
  const provider = new firebase.auth.GithubAuthProvider();

  firebase.initializeApp(firebaseConfig);
  try {
    const { user } = await firebase.auth().signInWithPopup(provider);
    const { email, displayName } = user;
    const response = await axios.post('http://localhost:4000/api/auth/login', { email, name: displayName });

    setHeader(response.data.jwtToken);
    dispatch(getUser(email, displayName));
  } catch (err) {
    alert(message.loginError);
    console.warn(err);
  }
};

export const handleLogout = async dispatch => {
  setHeader();
  dispatch(deleteUser());
}
