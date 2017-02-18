import faker from 'faker';
import { v4 } from 'uuid';
import { filter, merge, times } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const _todos = {};

times(5).forEach(() => {
  const id = v4();

  _todos[id] = {
    id,
    title: faker.company.catchPhrase(),
    starred: false,
    completedAt: null,
    createAt: Date.now(),
    updateAt: Date.now(),
  };
});

const todos = handleActions({
  [actions.deleteTodo]: (state, { payload: { id } }) => filter(state, t => t.id !== id),
  [actions.saveTodo]: (state, { payload }) => {
    if (!payload.id) {
      payload.id = v4();
    }

    return merge({}, state, { [payload.id]: payload });
  },
  // [actions.addToCache]: state => state,
  // [actions.removeFromCache]: (state, { payload }) => payload,
}, _todos);

export default combineReducers({ todos });
