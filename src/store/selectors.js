import { filter, values } from 'lodash';
import { createSelector } from 'reselect';

// const getData = (attr, notDef) => state => get(state[attr], attr, notDef);

export const getCompletedTodos = createSelector(
  state => filter(state.todos, todo => !!todo.completedAt),
  todos => values(todos),
);

export const getIncompletedTodos = createSelector(
  state => filter(state.todos, todo => !todo.completedAt),
  todos => values(todos),
);
