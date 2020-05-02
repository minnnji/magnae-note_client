import React, { useState } from 'react';
import Button from './Items/Button';

const Main = props => {
  const { mode, user_id, name, dispatch, createNewMeeting, joinMeetingApi, history } = props;
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main>
      <div>
        <h1>
          {mode === 'host'
            ? '새 회의실 만들기'
            : '회의 참여하기'}
        </h1>
        <input
          placeholder="회의실 이름"
          defaultValue={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="비밀번호"
          defaultValue={password}
          onChange={e => setPassword(e.target.value)}
        />
        {mode === 'host'
          ? (
            <Button onClick={async () => {
              const meetingId = await createNewMeeting(title, password, user_id, name, dispatch);
              history.push(`/meeting?meetingId=${meetingId}`);
            }}
            >
              완료
            </Button>
          )
          : (
            <Button onClick={async () => {
              const meeting = await joinMeetingApi(title, password, name, dispatch);
              history.push(`/meeting?meetingId=${meeting._id}`);
            }}
            >
              들어가기

            </Button>
          )}
      </div>
    </main>
  );
};

export default Main;
