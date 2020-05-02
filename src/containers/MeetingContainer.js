import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
import queryString from 'query-string';
import HeaderContainer from './HeaderContainer';
import MeetingSideBar from '../components/MeetingSideBar';
import Meeting from '../components/Meeting';
import messages from '../constants/messages';
import { receiveMyStream } from '../actions/index';

function MeetingContainer(props) {
  const { history, location } = props;
  const { meetingId } = queryString.parse(location.search);

  const mode = useSelector(state => state.mode.mode);
  const user = useSelector(state => state.user);
  const { myStream: stream } = useSelector(state => state.meeting);
  const dispatch = useDispatch();

  // webRTC
  const [mySocket, setMySocket] = useState({});
  const [partnerPeerInfo, setPartnerPeerInfo] = useState([]);
  // const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [callerId, setCallerId] = useState('');
  const [callerName, setCallerName] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const recordedVideo = useRef(); // 추후 상세페이지로 이동

  const isHost = mode === 'host';

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
          // setStream(myStream);
          dispatch(receiveMyStream(myStream));
          if (userVideo.current) {
            userVideo.current.srcObject = myStream;
          }
        })
        .catch(e => { console.log(`${e.name}: ${e.message}`); });
    } else {
      navigator.getWebcam({ audio: true, video: true },
        myStream => {
          // setStream(myStream);
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

  // watson-speech-to-text
  const [text, setText] = useState('');
  const [subText, setSubText] = useState('');
  const [micStream, setMicStream] = useState('');

  const onListenClick = () => {
    fetch('https://localhost:4000/api/speech-to-text/token')
      .then(response => response.json()).then(token => {
        const micListener = recognizeMic(Object.assign(token, {
          model: 'ko-KR_BroadbandModel',
          objectMode: true,
          format: true
        }));
        setMicStream(micListener);

        let script = '';

        micListener.on('data', data => {
          const streaming = data.results[0].alternatives[0].transcript;
          const isRest = data.results[0].final;
          setSubText(streaming);
          if (isRest) {
            setSubText('');
            script += streaming;
            setText(script);
          }
        });

        micListener.on('error', err => {
          console.log(err);
        });
      }).catch(error => {
        console.log(error);
      });
  };

  const onStopClick = () => {
    micStream.stop();
  };

  // record
  const mediaSource = new MediaSource();
  mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
  let mediaRecorder;
  let recordedBlobs;
  let sourceBuffer;

  function handleSourceOpen(event) {
    console.log('MediaSource opened');
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log('Source buffer: ', sourceBuffer);
  }

  function handleDataAvailable(event) {
    console.log(mediaRecorder);
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }

  const handleStart = () => {
    recordedBlobs = [];
    let options = { mimeType: 'video/webm;codecs=vp9' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      console.error(`${options.mimeType} is not Supported`);
      alert(`${options.mimeType} is not Supported`);
      options = { mimeType: 'video/webm;codecs=vp8' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        console.error(`${options.mimeType} is not Supported`);
        alert(`${options.mimeType} is not Supported`);
        options = { mimeType: 'video/webm' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          console.error(`${options.mimeType} is not Supported`);
          alert(`${options.mimeType} is not Supported`);
          options = { mimeType: '' };
        }
      }
    }

    try {
      mediaRecorder = new MediaRecorder(stream, options);
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      alert(`Exception while creating MediaRecorder: ${JSON.stringify(e)}`);
      return;
    }

    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);

    mediaRecorder.onstop = event => {
      console.log('Recorder stopped: ', event);
      console.log('Recorded Blobs: ', recordedBlobs);
    };
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(10);
    console.log('MediaRecorder started', mediaRecorder);
  };

  const handleStop = () => {
    console.log(mediaRecorder);
    // mediaRecorder.stop();  >>>>>>>>>>>>>> mediaRecorder가 undefined됨. rerender이슈 확인필요
    // micStream.stop();
    const isDown = window.confirm(messages.whetherToDownload);
    if (isDown) {
      const blob = new Blob(recordedBlobs, { type: 'video/mp4' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'test.webm';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 100);
    }
  };

  const handlePlayRecordedVideo = () => {
    const superBuffer = new Blob(recordedBlobs, { type: 'video/mp4' });
    recordedVideo.current.src = null;
    recordedVideo.current.srcObject = null;
    recordedVideo.current.src = window.URL.createObjectURL(superBuffer);
    recordedVideo.current.controls = true;
    recordedVideo.current.play();
  };

  const handleDownLoadVideo = () => {
    const blob = new Blob(recordedBlobs, { type: 'video/mp4' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <>
      <HeaderContainer history={history} />
      <MeetingSideBar
        stream={stream}
        handleStart={handleStart}
        handleStop={handleStop}
        recordedVideo={recordedVideo}
        handlePlayRecordedVideo={handlePlayRecordedVideo} // 추후 상세페이지로 이동
        handleDownLoadVideo={handleDownLoadVideo}
      />
      <Meeting
        mySocket={mySocket}
        isHost={isHost}
        receivingCall={receivingCall}
        callerName={callerName}
        partnerPeerInfo={partnerPeerInfo}
        partnerVideo={partnerVideo}
        text={text}
        subText={subText}
        callAccepted={callAccepted}
        acceptCall={acceptCall}
        callPeer={callPeer}
        onListenClick={onListenClick}
        onStopClick={onStopClick}
      />
    </>
  );
}

export default MeetingContainer;
