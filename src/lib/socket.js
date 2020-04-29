import io from 'socket.io-client';
import Peer from 'simple-peer';
import * as action from '../actions/index';

let socket;
let myStream;

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

export const socketSubscribe = async (stream, dispatch, setPeerStream, setreceivingCall, setCaller, setCallerSignal, setCallAccepted, caller, callerSignal) => {
  myStream = stream;
  console.log('my stream is', myStream);
  socket.on('message', message => {
    dispatch(action.receiveNotice(message));
  });

  socket.on('hey', data => {
    setreceivingCall(true);
    setCaller(data.from);
    setCallerSignal(data.signal);
    acceptCall(setCallAccepted, data.from, setPeerStream, data.signal);
  });
};

export const handleCreateRoom = (name, roomId) => {
  socket.emit('createRoom', name, roomId);
};

export const handleJoinRoom = (roomId, setPeerStream, setCallAccepted) => {
  console.log('peer stream is', myStream);
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream: myStream,
    debug: 3
  });
  peer.on('signal', data => {
    socket.emit('callUser', {
      roomId,
      signalData: data,
      from: socket.id
    });
  });
  peer.on('stream', str => {
    setPeerStream(str);
  });

  socket.on('callAccepted', signal => {
    setCallAccepted(true);
    peer.signal(signal);
  });
};

const acceptCall = (setCallAccepted, caller, setPeerStream, callerSignal) => {
  setCallAccepted(true);
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream: myStream,
    debug: 3
  });
  peer.on('signal', data => {
    socket.emit('acceptCall', {
      signal: data,
      to: caller
    });
  });
  peer.on('stream', str => {
    setPeerStream(str);
  });
  peer.signal(callerSignal);
};
