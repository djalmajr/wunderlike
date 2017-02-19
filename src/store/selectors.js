import { filter, values } from 'lodash';
import { createSelector } from 'reselect';

export const getCompletedTodos = createSelector(
  state => filter(state.todos, todo => !!todo.completedAt),
  todos => values(todos),
);

export const getIncompletedTodos = createSelector(
  state => filter(state.todos, todo => !todo.completedAt),
  todos => values(todos),
);

export const getSelectedList = state => state.selectedList;
