import React from 'react';
import { useDispatch } from 'react-redux';
import { setModeNew, setModeJoin } from '../actions/index';
import Lnb from '../components/Lnb';

const LnbContainer = props => {
  const dispatch = useDispatch();

  return (
    <>
      <Lnb
        setModeNew={setModeNew}
        setModeJoin={setModeJoin}
        dispatch={dispatch} />
    </>
  );
};

export default LnbContainer;
