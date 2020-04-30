import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
// import socketio from 'socket.io-client';
import Peer from 'simple-peer';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

function Meeting() {
  const [yourID, setYourID] = useState('');
  const [users, setUsers] = useState({});
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();


  useEffect(() => {
    socket.current = io.connect('https://localhost:4000');
    // socket = socketio.connect('http://localhost:443');
    navigator.getWebcam = (navigator.getUserMedia
      || navigator.webKitGetUserMedia
      || navigator.moxGetUserMedia
      || navigator.mozGetUserMedia
      || navigator.msGetUserMedia);

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(stream => {
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        })
        .catch(e => { console.log(`${e.name}: ${e.message}`); });
    } else {
      navigator.getWebcam({ audio: true, video: true },
        stream => {
          setStream(stream);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        },
        () => { console.log('Web cam is not accessible.'); });
    }

    socket.current.on('yourID', id => {
      alert(id);
      console.log('yourId', id);
      setYourID(id);
    });
    socket.current.on('allUsers', users => {
      console.log('allUsers', users);
      setUsers(users);
    });

    // 4. 참여자 데이터 받음, set state
    socket.current.on('hey', data => {
      console.log('hey', data);
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  function callPeer(id) {
    const peer = new Peer({ // 1. 나를 peer로 만들어서
      initiator: true,
      trickle: false,
      stream
    });

    peer.on('signal', data => { // peer
      console.log('signal', data);
      // 2. 상대방에게 call
      socket.current.emit('callUser', { userToCall: id, signalData: data, from: yourID });
    });

    peer.on('stream', stream => {
      console.log('stream', stream);
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on('callAccepted', signal => {
      console.log('callAccepted', signal);
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({ // 방장이 자기 구성
      initiator: false,
      trickle: false,
      stream
    });
    peer.on('signal', data => {
      console.log('acceptCall-signal', data);
      // 방장이 data 보냄
      socket.current.emit('acceptCall', { signal: data, to: caller });
    });

    peer.on('stream', stream => {
      console.log('accetpCall-stream', stream);
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <Video playsInline muted ref={userVideo} autoPlay />
    );
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video playsInline ref={partnerVideo} autoPlay />
    );
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>
          {caller}
          {' '}
          is calling you
        </h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }
  return (
    <main>
      <div>
        영상
        <Container>
          <Row>
            {UserVideo}
            {PartnerVideo}
          </Row>
          <Row>
            {Object.keys(users).map(key => {
              if (key === yourID) {
                return null;
              }
              return (
                <button onClick={() => callPeer(key)}>
                  Call
                  {' '}
                  {key}
                </button>
              );
            })}
          </Row>
          <Row>
            {incomingCall}
          </Row>
        </Container>
      </div>
      <div>
        스크립트
      </div>
    </main>
  );
}

export default Meeting;
