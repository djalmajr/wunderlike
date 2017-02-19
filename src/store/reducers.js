import { v4 } from 'uuid';
import { filter, merge } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

// {
//   id,
//   title: '',
//   starred: false,
//   completedAt: null,
//   createAt: Date.now(),
//   updateAt: Date.now(),
// };

const selectedList = handleActions({
  [actions.changeList]: (state, { payload }) => payload,
}, 'inbox');

const todos = handleActions({
  [actions.deleteTodo]: (state, { payload: { id } }) =>
    filter(state, t => t.id !== id),

  [actions.saveTodo]: (state, { payload }) => {
    payload.id = payload.id || v4();

    return merge({}, state, { [payload.id]: payload });
  },

  [actions.toggleCompleted]: (state, { payload }) => merge({}, state, {
    [payload.id]: { ...payload, completedAt: payload.completedAt ? null : Date.now() },
  }),

  [actions.toggleStarred]: (state, { payload }) => merge({}, state, {
    [payload.id]: { ...payload, starred: !payload.starred },
  }),
}, {});

export default combineReducers({ selectedList, todos });
