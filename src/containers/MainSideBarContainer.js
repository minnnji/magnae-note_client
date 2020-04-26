import React from 'react';
import { useDispatch } from 'react-redux';
import { setModeNew, setModeJoin } from '../actions/index';
import MainSideBar from '../components/MainSideBar';

const MainSideBarContainer = props => {
  const dispatch = useDispatch();

  return (
    <>
      <MainSideBar
        setModeNew={setModeNew}
        setModeJoin={setModeJoin}
        dispatch={dispatch} />
    </>
  );
};

export default MainSideBarContainer;
