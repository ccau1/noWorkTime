import { Map } from 'immutable';
import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const user = createReducer(Map({}), {
  [types.USER_SIGN_IN_COMPLETE]: (state, actions) => {
    return state.set('item', actions.payload).set('status', 'ready');
  }
});
