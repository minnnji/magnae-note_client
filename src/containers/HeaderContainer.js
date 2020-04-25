import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
import Header from '../components/Header/Header';
import { handleLogin, handleLogout } from '../lib/api';

const HeaderContainer = props => {
  return (
    <Header handleLogin={handleLogin} handleLogout={handleLogout}/>
  );
};

const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => {

};

// export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);

export default HeaderContainer;