import { combineReducers } from 'redux';
import * as userReducer from './user';
import * as workSettingsReducer from './workSettings';

export default combineReducers(Object.assign(
  userReducer,
  workSettingsReducer,
));
