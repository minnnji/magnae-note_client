import React, { useState, useEffect } from 'react';
// import electron from 'electron';
// import Store from 'electron-store';
import { exeSync } from 'child_process';
import styled from 'styled-components';
// import fs from 'fs';
import { BigButton } from './Items/Button';
import Input from './Items/Input';
import homeImg from '../lib/homeImg.gif';

// TO DO
// const store = new Store();
// const { app } = electron.remote;

const Main = props => {
  const { mode, user_id, name, dispatch, createNewMeetingApi, joinMeetingApi, history } = props;
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  // TO DO
  // useEffect(() => {
  //   if (!fs.existSync(`${app.getPath('documents')}/magnaeNote`)) {
  //     exeSync('mkdir /magnaeNote', { cwd: app.getPath('documents') });
  //     store.set('default-path', `${app.getPath('documents')}/magnaeNote`);
  //   }
  // }, []);

  return (
    <main>
      {!user_id
        && (
          <div>
            <Img src={homeImg} alt="home image" />
            <Title>
              Magnae-Note와 함께, 누구보다 스마트한
              <br />
              회의 영상 & 회의록을 남겨보세요!
            </Title>
          </div>
        )}
      {user_id
        && (
          <Wrapper>
            <h1>
              {mode === 'host'
                ? '새 회의실 만들기'
                : '회의 참여하기'}
            </h1>
            <Input
              placeholder="회의실 이름"
              defaultValue={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Input
              placeholder="비밀번호"
              defaultValue={password}
              onChange={e => setPassword(e.target.value)}
            />
            {mode === 'host'
              ? (
                <BigButton onClick={async () => {
                  try {
                    const meetingId = await createNewMeetingApi(title, password, user_id, name, dispatch);
                    history.push(`/meeting?meetingId=${meetingId}`);
                  } catch (err) {
                    console.log(err);
                  }
                }}
                >
                  완료
                </BigButton>
              )
              : (
                <BigButton onClick={async () => {
                  try {
                    const meeting = await joinMeetingApi(title, password, name, dispatch);
                    history.push(`/meeting?meetingId=${meeting._id}`);
                  } catch (err) {
                    console.log(err);
                  }
                }}
                >
                  들어가기
                </BigButton>
              )}
          </Wrapper>
        )}
    </main>
  );
};

const Wrapper = styled.div`
  margin: 4em;
`;

const Img = styled.img`
  position: relative;
  width: 1050px;
`;

const Title = styled.h1`
  position: absolute;
  top: 28%;
  left: 42%;
  text-align: center;
`;

export default Main;
