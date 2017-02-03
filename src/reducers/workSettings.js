import { Map } from 'immutable';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const workSettings = createReducer(Map({}), {
  [types.WORK_SETTINGS_FETCH_COMPLETE]: (state, actions) => {
    return state.set('item', actions.payload).set('status', 'ready');
  },
  [types.WORK_SETTINGS_UPDATE_COMPLETE]: (state, actions) => {
    return state.set('item', actions.payload).set('status', 'ready');
  }
});
