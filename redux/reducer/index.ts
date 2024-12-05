import {combineReducers} from 'redux';
import authReducer from './authReducer';
import canteenReducer from './canteenReducer';
import settingReducer from './settingsReducer';
import foodReducer from './foodReducer';

export const reducer = combineReducers({
  state: (state = {}) => state,
  authReducer,
  canteenReducer,
  food: foodReducer,
  settings: settingReducer,
});
