import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import queryString from 'query-string';
import HeaderContainer from './HeaderContainer';
import MeetingSideBar from '../components/MeetingSideBar';
import Meeting from '../components/Meeting';

function MeetingContainer(props) {
  const { history, location } = props;
  const { meetingId } = queryString.parse(location.search);

  const mode = useSelector(state => state.mode.mode);
  const user = useSelector(state => state.user);

  const [mySocket, setMySocket] = useState({});
  const [partnerPeerInfo, setPartnerPeerInfo] = useState([]);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerId, setCallerId] = useState('');
  const [callerName, setCallerName] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();

  const isHost = mode === 'new';

  useEffect(() => {
    const socket = io.connect('https://localhost:4000/');
    setMySocket(socket);

    navigator.getWebcam = (navigator.getUserMedia
      || navigator.webKitGetUserMedia
      || navigator.moxGetUserMedia
      || navigator.mozGetUserMedia
      || navigator.msGetUserMedia);

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(myStream => {
          setStream(myStream);
          if (userVideo.current) {
            userVideo.current.srcObject = myStream;
          }
        })
        .catch(e => { console.log(`${e.name}: ${e.message}`); });
    } else {
      navigator.getWebcam({ audio: true, video: true },
        myStream => {
          setStream(myStream);
          if (userVideo.current) {
            userVideo.current.srcObject = myStream;
          }
        },
        () => { console.log('Web cam is not accessible.'); });
    }

    const roomId = meetingId;

    if (isHost) {
      socket.emit('createRoom', user.name, roomId);
    } else {
      socket.emit('joinRoom', user.name, roomId);
    }

    socket.on('thisRoomUsers', peerInfo => {
      setPartnerPeerInfo(peerInfo);
    });

    socket.on('hey', data => {
      setReceivingCall(true);
      setCallerId(data.fromId);
      setCallerName(data.fromName);
      setCallerSignal(data.signal);
    });
  }, []);

  function callPeer(mySocket, peerSocketId) {
    const myPeer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    myPeer.on('signal', data => {
      mySocket.emit('callUser', {
        userToCall: peerSocketId,
        signalData: data,
        fromId: mySocket.id,
        fromName: user.name });
    });

    myPeer.on('stream', stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    mySocket.on('callAccepted', signal => {
      setCallAccepted(true);
      myPeer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const partnerPeer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });
    partnerPeer.on('signal', data => {
      mySocket.emit('acceptCall', {
        signal: data,
        to: callerId });
    });

    partnerPeer.on('stream', stream => {
      partnerVideo.current.srcObject = stream;
    });

    partnerPeer.signal(callerSignal);
  }

  return (
    <>
      <HeaderContainer history={history} />
      <MeetingSideBar stream={stream} />
      <Meeting
        mySocket={mySocket}
        isHost={isHost}
        receivingCall={receivingCall}
        callerName={callerName}
        partnerPeerInfo={partnerPeerInfo}
        partnerVideo={partnerVideo}
        callAccepted={callAccepted}
        acceptCall={acceptCall}
        callPeer={callPeer}
      />
    </>
  );
}

export default MeetingContainer;
