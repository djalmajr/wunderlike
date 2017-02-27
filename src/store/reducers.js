import { omit } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

const _getType = completedAt => completedAt ? 'completed' : 'uncompleted';

const _removeFromList = (list, { completedAt, id }) => {
  const type = _getType(completedAt);

  return { ...list, [type]: list[type].filter(tid => tid !== id) };
};

const _saveToList = (list, { completedAt, id }) => {
  const type = _getType(completedAt);

  return {
    ...list,
    [type]: list[type].indexOf(id) === -1 ? list[type].concat([id]) : list[type],
  };
};

const _toggleTodoInList = (list, { completedAt, id }) => {
  const fnToggle = (condition, type) => condition ?
    list[type].filter(tid => tid !== id) :
    list[type].concat([id]);

  return {
    completed: fnToggle(completedAt, 'completed'),
    uncompleted: fnToggle(!completedAt, 'uncompleted'),
  };
};

export default combineReducers({
  lists: handleActions({
    [actions.saveList]: (state, { payload }) => payload,
  }, []),

  selectedListId: handleActions({
    [actions.changeList]: (state, { payload }) => payload,
  }, 'inbox'),

  todos: handleActions({
    [actions.deleteTodo]: (state, { payload }) => omit(state, payload.id),

    [actions.saveTodo]: (state, { payload }) => ({
      ...state,
      [payload.id]: payload,
    }),

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
    [actions.deleteTodo]: (state, { payload: { listId, ...todo } }) => ({
      ...state,
      [listId]: _removeFromList(state[listId], todo),
    }),

    [actions.saveTodo]: (state, { payload: { listId, ...todo } }) => ({
      ...state,
      [listId]: _saveToList(state[listId], todo),
    }),

    [actions.toggleCompleted]: (state, { payload: { listId, ...todo } }) => ({
      ...state,
      [listId]: _toggleTodoInList(state[listId], todo),
    }),
  }, { inbox: { completed: [], uncompleted: [] } }),
});
