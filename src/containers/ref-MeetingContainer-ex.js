import React from 'react';
import { connect } from 'react-redux';
import socketio from 'socket.io-client';
import PropTypes from 'prop-types';
import App from '../components/App/App';
import * as action from '../actions/index';

const socket = socketio.connect('http://localhost:4000');

const socketSubscribe = dispatch => {
  socket.on('connectSuccess', userData => {
    dispatch(action.connectSuccess(userData));
  });

  socket.on('message', messageData => {
    if (messageData.message.startsWith('[안내] ')) {
      return dispatch(action.noticeMessage(messageData));
    }
    dispatch(action.receiveMessage(messageData));
  });

  socket.on('startTyping', () => {
    dispatch(action.startTyping());
  });

  socket.on('stopTyping', () => {
    dispatch(action.stopTyping());
  });
};

const AppContainer = props => {
  const {
    user,
    chattingRoom,
    typingIndicator,
    handleConnect,
    handleMessage,
    handleQuitConnect,
    handleNextConnect,
    handleTypingshow,
    handleTypingRemove
  } = props;

  return (
    <App
      user={user}
      chattingRoom={chattingRoom}
      typingIndicator={typingIndicator}
      handleConnect={handleConnect}
      handleMessage={handleMessage}
      handleQuitConnect={handleQuitConnect}
      handleNextConnect={handleNextConnect}
      handleTypingshow={handleTypingshow}
      handleTypingRemove={handleTypingRemove}
    />
  );
};

const mapStateToProps = state => {
  const { user, chattingRoom, typingIndicator } = state;
  return {
    user,
    chattingRoom,
    typingIndicator
  };
};

const mapDispatchToProps = dispatch => {
  socketSubscribe(dispatch);

  return {
    handleConnect(name) {
      socket.emit('requestConnection', name);
    },
    handleMessage(roomId, message) {
      socket.emit('message', { roomId, message }, messageData => {
        dispatch(action.sendMessage(messageData));
      });
    },
    handleQuitConnect(currentRoomId) {
      socket.emit('leave', currentRoomId, () => {
        dispatch(action.removeMessages());
      });
    },
    handleNextConnect(currentRoomId, name) {
      socket.emit('leave', currentRoomId, () => {
        dispatch(action.removeMessages());
        socket.emit('requestConnection', name);
      });
    },
    handleTypingRemove(roomId) {
      socket.emit('hideTypingIcon', roomId);
    },
    handleTypingshow(roomId) {
      socket.emit('showTypingIcon', roomId);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

AppContainer.propTypes = {
  user: PropTypes.shape({
    isConnected: PropTypes.bool,
    info: PropTypes.shape({
      socketId: PropTypes.string,
      name: PropTypes.string
    }),
    isMatch: PropTypes.bool.isRequired,
    joinedRoomId: PropTypes.string,
    isError: PropTypes.bool
  }).isRequired,
  chattingRoom: PropTypes.shape({
    chatLists: PropTypes.array,
    idError: PropTypes.bool
  }).isRequired,
  typingIndicator: PropTypes.shape({
    isDisplay: PropTypes.bool
  }).isRequired,
  handleConnect: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired,
  handleQuitConnect: PropTypes.func.isRequired,
  handleNextConnect: PropTypes.func.isRequired,
  handleTypingshow: PropTypes.func.isRequired,
  handleTypingRemove: PropTypes.func.isRequired
};
