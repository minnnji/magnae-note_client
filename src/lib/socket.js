import io from 'socket.io-client';
import Peer from 'simple-peer';

let socket;

export const connectSocket = () => {
  socket = io(process.env.REACT_APP_SERVER_SOCKET);
};

export const getSocket = () => socket;

export const createRoom = (userId, roomId) => {
  socket.emit('createRoom', userId, roomId);
};

export const joinRoom = (userId, roomId) => {
  socket.emit('joinRoom', userId, roomId);
};

export const sendCallToPeer = (
  stream,
  name,
  peerSocketId,
  sendingCall,
  acceptingCall,
  receivingPeerStream,
  dispatch
) => {
  const myPeer = new Peer({
    initiator: true,
    trickle: false,
    stream
  });

  myPeer.on('signal', data => {
    socket.emit('callUser', {
      userToCall: peerSocketId,
      signalData: data,
      fromId: socket.id,
      fromName: name
    });
    sendingCall(dispatch);
  });

  myPeer.on('stream', peerStream => {
    receivingPeerStream(peerStream, dispatch);
  });

  socket.on('callAccepted', signal => {
    acceptingCall(dispatch);
    myPeer.signal(signal);
  });
};

export const acceptCallToPeer = (
  stream,
  peerSocketId,
  peerSignal,
  acceptingCall,
  receivingPeerStream,
  dispatch
) => {
  acceptingCall(dispatch);

  const partnerPeer = new Peer({
    initiator: false,
    trickle: false,
    stream
  });

  partnerPeer.on('signal', data => {
    socket.emit('acceptCall', {
      signal: data,
      to: peerSocketId
    });
  });

  partnerPeer.on('stream', peerStream => {
    receivingPeerStream(peerStream, dispatch);
  });

  partnerPeer.signal(peerSignal);
};

export const callPeerToStart = peerSocketId => {
  socket.emit('callUserToStart', {
    userToCall: peerSocketId,
    fromId: socket.id
  });
};

export const callPeerToEnd = peerSocketId => {
  socket.emit('callUserToEnd', {
    userToCall: peerSocketId,
    fromId: socket.id
  });
};
