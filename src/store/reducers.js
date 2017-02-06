import faker from 'faker';
import { v4 } from 'uuid';
import { times } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const _todos1 = times(5).map(() => ({
  id: v4(),
  title: faker.company.catchPhrase(),
  starred: false,
  completedAt: null,
  createAt: Date.now(),
  updateAt: Date.now(),
}));

const _todos2 = times(2).map(() => ({
  id: v4(),
  title: faker.company.catchPhrase(),
  starred: false,
  completedAt: Date.now(),
  createAt: Date.now(),
  updateAt: Date.now(),
}));

const todos = handleActions({
  [actions.addToCache]: state => state,
  [actions.removeFromCache]: (state, { payload }) => payload,
}, _todos1.concat(_todos2));

export default combineReducers({ todos });
