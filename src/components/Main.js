import React, { useState } from 'react';
import Button from './Items/Button';

const Main = (props) => {
  const { mode, user_id, name, createNewMeeting, dispatch } = props;
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main>
      <h1>
        {mode === 'new'
          ? '새 회의실 만들기'
          : '회의 참여하기'}
      </h1>
      <input
        placeholder='회의실 이름'
        defaultValue={title}
        onChange={e => setTitle(e.target.value)}/>
      <input
        placeholder='비밀번호'
        defaultValue={password}
        onChange={e => setPassword(e.target.value)}/>
      {mode === 'new'
        ? <Button onClick={() => createNewMeeting(title, password, user_id, name, dispatch)}>완료</Button>
        : <Button>들어가기</Button>}
    </main>
  );
}

export default Main;
