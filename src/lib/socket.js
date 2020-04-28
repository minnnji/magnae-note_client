import io from 'socket.io-client';
import Peer from 'simple-peer';
import * as action from '../actions/index';

let socket;

export const connectSocket = () => {
  console.log('connect!');
  socket = io('https://localhost:4000');
};

// TO DO
export const disconnectSocket = () => {
  console.log('disconnect!');
  socket.emit('disconnect');
  socket.off();
};

export const socketSubscribe = async (user, stream, dispatch, setPeerStream) => {
  socket.on('message', message => {
    dispatch(action.receiveNotice(message));
  });

  socket.on('peerCallToCreator', data => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });
    peer.on('signal', data => {
      socket.emit('creatorCall', {
        signal: data,
        to: data.from
      });
    });
    peer.on('stream', stream => {
      setPeerStream(stream);
    });
    peer.signal(data.signal);
  });
};

export const handleCreateRoom = (name, roomId) => {
  socket.emit('createRoom', name, roomId);
};

export const handleJoinRoom = (name, roomId, stream, dispatch, setPeerStream) => {
  const peer = new Peer({
    initiator: true,
    stream
  });
  peer.on('signal', data => {
    socket.emit('peerCall', {
      from: socket.id,
      roomId,
      signalData: data
    });
  });
  peer.on('stream', stream => {
    setPeerStream(stream);
  });

  socket.on('callAccepted', signal => {
    peer.signal(signal);
  });
};
