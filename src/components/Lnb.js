import React from 'react';
import Button from './Items/Button';

const Lnb = (props) => {
  const { setModeNew, setModeJoin, dispatch } = props;
  return (
    <nav>
      <Button onClick={() => dispatch(setModeNew())}>새 회의실 만들기</Button>
      <Button onClick={() => dispatch(setModeJoin())}>회의 참여하기</Button>
    </nav>
  );
}

export default Lnb;
