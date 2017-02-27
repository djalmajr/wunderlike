import { omit } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export default combineReducers({
  lists: handleActions({
    [actions.saveList]: (state, { payload }) => payload,
  }, []),

  listsLen: handleActions({
    [actions.createTodo]: (state, { payload: { listId } }) => ({
      ...state,
      [listId]: (state[listId] || 0) + 1,
    }),
    [actions.removeTodo]: (state, { payload: { listId } }) => ({
      ...state,
      [listId]: state[listId] - 1,
    }),
    [actions.toggleCompleted]: (state, { payload: { completedAt, listId } }) => ({
      ...state,
      [listId]: completedAt ? state[listId] + 1 : state[listId] - 1,
    }),
  }, {}),

  selectedListId: handleActions({
    [actions.changeList]: (state, { payload }) => payload,
  }, 'inbox'),

  todos: handleActions({
    [actions.createTodo]: (state, { payload }) => ({ ...state, [payload.id]: payload }),
    [actions.editTodo]: (state, { payload }) => ({ ...state, [payload.id]: payload }),
    [actions.removeTodo]: (state, { payload }) => omit(state, payload.id),
    [actions.toggleCompleted]: (state, { payload }) => ({
      ...state,
      [payload.id]: {
        ...payload,
        completedAt: payload.completedAt ? null : Date.now(),
      },
    }),
    [actions.toggleStarred]: (state, { payload }) => ({
      ...state,
      [payload.id]: {
        ...payload,
        starred: !payload.starred,
      },
    }),
  }, {}),

  todoIdsInList: handleActions({
    [actions.createTodo]: (state, { payload: { id, listId } }) => ({
      ...state,
      [listId]: state[listId].indexOf(id) === -1 ?
        state[listId].concat([id]) : state[listId],
    }),
    [actions.removeTodo]: (state, { payload: { id, listId } }) => ({
      ...state,
      [listId]: state[listId].filter(tid => tid !== id),
    }),
  }, { inbox: [] }),
});
