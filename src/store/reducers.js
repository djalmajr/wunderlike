import { omit } from 'lodash';
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

const createListIdReducer = ({ invert } = {}) => {
  const parse = val => invert ? !val : val;

  return handleActions({
    [actions.deleteTodo]: (state, { payload: { completedAt, id } }) => (
      parse(completedAt) && state.indexOf(id) === -1 ? state.concat([id]) : state
    ),

    [actions.saveTodo]: (state, { payload: { completedAt, id } }) => (
      parse(completedAt) ? state.filter(tid => tid !== id) : state
    ),

    [actions.toggleCompleted]: (state, { payload: { completedAt, id } }) => (
      parse(completedAt) ? state.filter(tid => tid !== id) : state.concat([id])
    ),
  }, []);
};

export default combineReducers({
  completedTodoIds: createListIdReducer(),

  uncompletedTodoIds: createListIdReducer({ invert: true }),

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
    [actions.deleteTodo]: (state, { payload: { id, listId } }) => ({
      ...state,
      [listId]: state[listId].filter(todoId => todoId !== id),
    }),

    [actions.saveTodo]: (state, { payload: { id, listId } }) => (
      state[listId].find(lid => lid === id) ? state : {
        ...state,
        [listId]: state[listId].concat([id]),
      }
    ),

    [actions.toggleCompleted]: (state, { payload }) => ({
      ...state,
      [payload.listId]: payload.completedAt ?
        state[payload.listId].concat([payload.id]) :
        state[payload.listId].filter(lid => lid !== payload.id),
    }),
  }, { inbox: [] }),
});
