import { combineReducers } from 'redux';
import countReducer from './countReducer';

const reducers = combineReducers({
  counter: countReducer,
});

export default reducers;
