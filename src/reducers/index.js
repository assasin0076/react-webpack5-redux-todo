import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const rootReducer = combineReducers({
  state: (state = {}) => state
});

export default rootReducer;