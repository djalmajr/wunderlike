import faker from 'faker';
import { v4 } from 'uuid';
import { times } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const _todos = times(3).map(() => ({
  id: v4(),
  title: faker.company.catchPhrase(),
  starred: false,
  completed: false,
  createAt: Date.now(),
  updateAt: Date.now(),
}));

const todos = handleActions({
  [actions.saveTodo]: state => state,
  [actions.removeTodo]: (state, { payload }) => payload,
}, _todos);

export default combineReducers({ todos });
