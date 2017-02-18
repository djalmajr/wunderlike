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
  [actions.deleteTodo]: (state, { payload: { id } }) =>
    filter(state, t => t.id !== id),

  [actions.saveTodo]: (state, { payload }) => merge({}, state, {
    [payload.id]: { ...payload, id: payload.id ? payload.id : v4() },
  }),

  [actions.toggleCompleted]: (state, { payload }) => merge({}, state, {
    [payload.id]: { ...payload, completedAt: payload.completedAt ? null : Date.now() },
  }),

  [actions.toggleStarred]: (state, { payload }) => merge({}, state, {
    [payload.id]: { ...payload, starred: !payload.starred },
  }),
}, _todos);

export default combineReducers({ todos });
