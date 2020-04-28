import io from 'socket.io-client';
import Peer from 'simple-peer';
import * as action from '../actions/index';

let socket;

export const connectSocket = () => {
  console.log('connect!');
  socket = io('https://localhost:4000');
};

export const disconnectSocket = () => {
  console.log('disconnect!');
  socket.emit('disconnect');
  socket.off();
};

export const socketSubscribe = async (user, dispatch) => {
  socket.on('message', message => {
    console.log(message);
    dispatch(action.receiveNotice(message));
  });
};

export const handleCreate = (name, roomId) => {
  socket.emit('createRoom', name, roomId);
};

export const joinMeeting = (name, roomId, stream, dispatch) => {
  const peer = new Peer({
    initiator: false,
    stream
  });
  socket.emit('join', name, roomId);
};
