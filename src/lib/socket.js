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

export const connectPeer = (stream, setPeerStream, mode, meetingId) => {
  const isHost = mode === 'new';

  // if (!isHost) {
  //   debugger;
  // }

  console.log('Connecting Peer');

  const myPeer = new Peer({ initiator: true, trickle: false, stream });
  const yourPeer = new Peer({ initiator: false });

  if (isHost) {
    socket.emit('createRoom', 'Ken Huh', meetingId);

    socket.on('hey', ({ signal, from }) => {
      console.log('someone joined..', signal, from);
      yourPeer.signal(signal);
    });

    myPeer.on('signal', data => {
      console.log('my peer signal', data);
    });

    yourPeer.on('stream', yourPeerStream => {
      console.log('your peer stream..');
      yourPeer.addStream(yourPeerStream);
      setPeerStream(yourPeerStream);
    });
  } else {
    socket.emit('joinRoom', 'Wan Huh', meetingId);

    myPeer.on('signal', data => {
      console.log('my peer signal', data);
      socket.emit('callUser', {
        roomId: meetingId,
        signalData: data,
        from: socket.id
      });
    });
  }
};

// export const socketSubscribe = (stream, dispatch, setPeerStream, setreceivingCall, setCaller, setCallerSignal, setCallAccepted, caller, callerSignal) => {
//   myStream = stream;
//   console.log('my stream is', myStream);
//   socket.on('message', message => {
//     dispatch(action.receiveNotice(message));
//   });

//   socket.on('hey', data => {
//     console.log('hey event');
//     // setreceivingCall(true);
//     // setCaller(data.from);
//     // setCallerSignal(data.signal);
//     acceptCall(setCallAccepted, data.from, setPeerStream, data.signal);
//   });
// };

// export const handleCreateRoom = (name, roomId) => {
//   socket.emit('createRoom', name, roomId);
// };

// export const handleJoinRoom = (roomId, setPeerStream, setCallAccepted) => {
//   console.log('my stream is', myStream);
//   const peer = new Peer({
//     initiator: true,
//     trickle: false,
//     stream: myStream,
//     debug: 3
//   });
//   peer.on('signal', data => {
//     console.log('join room peer signal:', data);
//     socket.emit('callUser', {
//       roomId,
//       signalData: data,
//       from: socket.id
//     });
//   });
//   peer.on('stream', str => {
//     console.log('join room peer stream:', str);
//     setPeerStream(str);
//   });

//   socket.on('callAccepted', signal => {
//     console.log('join room socket callAccepted:', signal);
//     setCallAccepted(true);
//     peer.signal(signal);
//   });
// };

// const acceptCall = (setCallAccepted, caller, setPeerStream, callerSignal) => {
//   // setCallAccepted(true);
//   const peer = new Peer({
//     initiator: true,
//     trickle: false,
//     stream: myStream,
//     debug: 3
//   });
//   peer.on('signal', data => {
//     console.log('peer signal event');
//     socket.emit('acceptCall', {
//       signal: data,
//       to: caller
//     });
//   });
//   peer.on('stream', str => {
//     console.log('peer stream event', str);
//     setPeerStream(str);
//   });
//   peer.signal(callerSignal);
// };
