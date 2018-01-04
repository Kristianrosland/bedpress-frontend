import { combineReducers } from 'redux';
import countReducer from './countReducer';
import authReducer from './authReducer';

const reducers = combineReducers({
  counter: countReducer,
  auth: authReducer,
});

export default reducers;
