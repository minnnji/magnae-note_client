import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
import {
  connectSocket,
  createRoom,
  joinRoom,
  sendCallToPeer,
  acceptCallToPeer,
  callPeerToStart,
  callPeerToEnd
} from '../lib/socket';
import getMediaDevices from '../lib/webRTC';

import {
  receiveMyStream,
  receiveStartTime,
  receiveEndTime,
  receiveMember
} from '../actions/index';

import {
  onUpdateMember,
  onReceiveCall,
  onStartMeeting,
  onStopMeeting,
  sendingCall,
  acceptingCall,
  receivingPeerStream,
  setStreamRecorder
} from '../actions/meeting.actions';

import messages from '../constants/messages';
import { updateMeetingApi, updateUserApi } from '../api';

import MeetingSideBar from '../components/MeetingSideBar';
import Meeting from '../components/Meeting';

const scripts = [];

function MeetingContainer(props) {
  const { history, location } = props;

  const mode = useSelector(state => state.mode.mode);
  const user = useSelector(state => state.user);
  const meetingInfo = useSelector(state => state.meeting);
  const dispatch = useDispatch();

  const { meetingId } = queryString.parse(location.search);
  const roomId = meetingId;
  const isHost = mode === 'host';
  const { startTime, myStream, memberList, isMeetingRecord } = meetingInfo;

  // webRTC
  useEffect(() => {
    connectSocket();
    if (isHost) {
      createRoom(user.name, roomId);
    } else {
      joinRoom(user.name, roomId);
    }
  }, []);

  useEffect(() => {
    getMediaDevices(receiveMyStream, dispatch);
  }, []);

  useEffect(() => {
    onUpdateMember(dispatch);
    onReceiveCall(dispatch);
    onStartMeeting(handleStart, dispatch);
    onStopMeeting(handleStop, dispatch);
  }, []);

  // watson-speech-to-text
  const [text, setText] = useState('');
  const [subText, setSubText] = useState('');
  const [micStream, setMicStream] = useState('');

  const onListenClick = useCallback(() => {
    fetch(process.env.REACT_APP_WATSON)
      .then(response => response.json())
      .then(token => {
        const micListener = recognizeMic(
          Object.assign(token, {
            model: 'ko-KR_BroadbandModel',
            objectMode: true,
            format: true,
            timestamps: true
          })
        );
        setMicStream(micListener);

        let script = '';

        micListener.on('data', data => {
          if (!data.results.length) return;
          const isRest = data.results[0].final;
          const streaming = data.results[0].alternatives[0];
          const streamingScript = streaming.transcript;
          setSubText(streamingScript);
          if (isRest) {
            const streamingStartTime = parseInt(streaming.timestamps[0][1], 10);
            scripts.push({
              currentTime: streamingStartTime,
              script: streamingScript
            });
            setSubText('');
            script += streamingScript;
            setText(script);
          }
        });

        micListener.on('error', err => {
          console.log(err);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, [scripts]);

  // record
  const mediaSource = new MediaSource();
  mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
  const recordedBlobs = useMemo(() => isMeetingRecord && [], [isMeetingRecord]);
  let sourceBuffer;

  function handleSourceOpen(event) {
    console.log('MediaSource opened');
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log('Source buffer: ', sourceBuffer);
  }

  function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }

  const createMediaRecorder = () => {
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
      const recorder = new MediaRecorder(myStream, options);
      return recorder;
    } catch (e) {
      console.error('Exception while creating MediaRecorder:', e);
      alert(`Exception while creating MediaRecorder: ${JSON.stringify(e)}`);
    }
  };

  const mediaRecorder = useMemo(
    () => isMeetingRecord && createMediaRecorder(),
    [isMeetingRecord]
  );

  useEffect(() => {
    if (mediaRecorder) {
      console.log('mediaRecorder Setting!');
      mediaRecorder.onstop = event => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs: ', recordedBlobs);
      };
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start(10);
      console.log('MediaRecorder started', mediaRecorder);
    }
  }, [mediaRecorder]);

  const download = (content, fileName, contentType, cb) => {
    const file = new Blob(content, { type: contentType });
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();

    if (cb) {
      setTimeout(() => cb(), 1000);
    }
  };

  const handleStart = useCallback(
    async partnerSocketId => {
      if (isHost) {
        await callPeerToStart(partnerSocketId);
      }
      setStreamRecorder(dispatch, false);
      setStreamRecorder(dispatch, true);
      // onListenClick();
      dispatch(receiveStartTime(new Date()));
    },
    [myStream]
  );

  const handleStop = useCallback(
    async partnerSocketId => {
      if (isHost) {
        await callPeerToEnd(partnerSocketId);
      }

      if (mediaRecorder.state === 'recording') {
        await mediaRecorder.stop();
        await micStream.stop();
      }
      const endTime = new Date();
      dispatch(receiveEndTime(endTime));
      dispatch(receiveMember(memberList));

      await updateMeetingApi(meetingId, startTime, endTime, memberList);
      await updateUserApi(user._id, meetingId);

      const isVideoDown = window.confirm(messages.whetherToVideoDown);
      if (isVideoDown) {
        download(recordedBlobs, 'test.webm', 'video/mp4', () => {
          const isScriptDown = window.confirm(messages.whetherToScriptDown);
          if (isScriptDown) {
            const scriptJson = JSON.stringify({ scripts });
            download([scriptJson], 'json.txt', 'text/plain');
          }
        });
      } else {
        const isScriptDown = window.confirm(messages.whetherToScriptDown);
        if (isScriptDown) {
          const scriptJson = JSON.stringify({ scripts });
          download([scriptJson], 'json.txt', 'text/plain');
        }
      }
      history.push(`/myMeeting?meetingId=${meetingId}`);
    },
    [mediaRecorder, micStream]
  );

  const handleCallPeer = () => {
    const peerSocketId = meetingInfo.memberList[0][1];
    sendCallToPeer(
      myStream,
      user.name,
      peerSocketId,
      sendingCall,
      acceptingCall,
      receivingPeerStream,
      dispatch
    );
  };

  const handleAcceptPeer = () => {
    acceptCallToPeer(
      myStream,
      meetingInfo.peerInfo.id,
      meetingInfo.peerInfo.signal,
      acceptingCall,
      receivingPeerStream,
      dispatch
    );
  };

  return (
    <>
      <MeetingSideBar
        meetingInfo={meetingInfo}
        myStream={myStream}
        isMeetingRecord={isMeetingRecord}
      />
      <Meeting
        isHost={isHost}
        meetingInfo={meetingInfo}
        memberList={memberList}
        text={text}
        subText={subText}
        handleCallPeer={handleCallPeer}
        handleAcceptPeer={handleAcceptPeer}
        isMeetingRecord={isMeetingRecord}
        handleStart={handleStart}
        handleStop={handleStop}
      />
    </>
  );
}

export default MeetingContainer;
