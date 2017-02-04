import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { innerReducer as asyncState } from 'redux-async-initial-state';
import * as actions from './actions';

const cacheMessage = handleActions({
  [actions.clearMessage]: () => '',
  [actions.saveMessage]: (state, { payload }) => payload,
}, '');

const notification = handleActions({
  [actions.notifyError]: (state, { payload }) => Object.assign({ position: 'br', level: 'error' }, payload),
  [actions.notifySuccess]: (state, { payload }) => Object.assign({ position: 'br', level: 'success' }, payload),
}, {});

export default combineReducers({ asyncState, cacheMessage, notification });
