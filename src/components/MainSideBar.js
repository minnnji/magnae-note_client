import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../constants/theme';
import moment from 'moment';

import Sidebar from './layout/Sidebar';
import { BigButton, BigBlueFilledButton } from './layout/Button';
import ScrollBox from './layout/ScrollBox';

const MainSideBar = props => {
  const { isLogin, meetingList, setModeHost, setModeGuest, dispatch, detail, history } = props;

  let MeetingList;
  if (meetingList) {
    MeetingList = meetingList.map((meeting, i) => (
      <Link to={`/myMeeting?meetingId=${meeting._id}`} key={i}>
        <Meeting>
          <p>{meeting.title}</p>
          <p>
            [Host]
            {meeting.memberList[0][0]}
          </p>
          <p>
            (
            {`${moment(meeting.startTime).format('LLL')} ~ ${moment(meeting.endTime).format('LT')}`}
            )
          </p>
        </Meeting>
      </Link>
    ));
  }

  const topContent =
    <>
      <BigBlueFilledButton
        onClick={() => {
          dispatch(setModeHost());
          if (detail) history.push('/');
        }}
      >
        새 회의실 만들기
      </BigBlueFilledButton>
      <BigButton
        onClick={() => {
          dispatch(setModeGuest());
          if (detail) history.push('/');
        }}
      >
        회의 참여하기
      </BigButton>
    </>
  ;

  return (
    <Sidebar topContent={topContent}>
      <h2>나의 회의록</h2>
      {!isLogin ? <NoMeeting>로그인 후 이용이 가능합니다.</NoMeeting>
        : meetingList.length
          ? <ScrollBox>{MeetingList}</ScrollBox>
          : <NoMeeting>저장된 회의록이 없습니다.</NoMeeting> }
    </Sidebar>
  );
};

const Meeting = styled.div`
  margin: 1em 0;
  padding: 1em 0;
  border-bottom: 1px dotted ${theme.COLOR_WHITE};
`;

const NoMeeting = styled.h4`
  margin: 2em 0;
`;

export default MainSideBar;
