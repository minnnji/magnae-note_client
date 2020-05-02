import React from 'react';
import { useDispatch } from 'react-redux';
import { setModeHost, setModeGuest } from '../actions/index';
import MainSideBar from '../components/MainSideBar';

const MainSideBarContainer = props => {
  const dispatch = useDispatch();

  return (
    <>
      <MainSideBar
        setModeHost={setModeHost}
        setModeGuest={setModeGuest}
        dispatch={dispatch}
      />
    </>
  );
};

export default MainSideBarContainer;
