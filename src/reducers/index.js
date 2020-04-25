import { combineReducers } from 'redux';
import user from './user';
import mode from './mode';
import meeting from './meeting';

const rootReducer = combineReducers({
  user,
  mode,
  meeting
});

export default rootReducer;
