import { curry, filter, values } from 'lodash';
import { createSelector } from 'reselect';

export const getSelectedListId = state => state.selectedListId;

export const getTodosByListId = curry((listId, state) =>
  filter(state.todos, todo => todo.listId === listId),
);

export const getTodosBySelectedListId = state =>
  getTodosByListId(getSelectedListId(state), state);

export const getCompletedTodos = createSelector(
  state => filter(getTodosBySelectedListId(state), todo => !!todo.completedAt),
  todos => values(todos),
);

export const getIncompletedTodos = createSelector(
  state => filter(getTodosBySelectedListId(state), todo => !todo.completedAt),
  todos => values(todos),
);
