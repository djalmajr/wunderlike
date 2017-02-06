// import _ from 'lodash';
// import { createSelector } from 'reselect';

// const getData = (attr, notDef) => state => get(state[attr], attr, notDef);

export const getCompletedTodos = state =>
  state.todos.filter(todo => !!todo.completedAt);

export const getIncompletedTodos = state =>
  state.todos.filter(todo => !todo.completedAt);
