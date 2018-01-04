import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventReducer from './eventReducer';

const reducers = combineReducers({
  auth: authReducer,
  events: eventReducer,
});

export default reducers;
