import {combineReducers} from 'redux';
import authReducer from './auth';
import canteenReducer from './canteenReducer';

export const reducer = combineReducers({
  state: (state = {}) => state,
  authReducer,
  canteenReducer,
});
