import { curry, filter, keys, values } from 'lodash/fp';
import { createSelectorCreator, defaultMemoize } from 'reselect';

const createCustomSelector = createSelectorCreator(
  defaultMemoize,
  (a, b) => keys(a).length === keys(b).length,
);

export const getSelectedListId = state => state.selectedListId;

export const getTodosByListId = curry((listId, state) => (
  filter(todo => todo.listId === listId)(state.todos)
));

export const getTodosInList = state => state.todosInList;

export const getTodosBySelectedListId = state =>
  getTodosByListId(getSelectedListId(state), state);

export const getCompletedTodos = createCustomSelector(
  state => filter(todo => !!todo.completedAt)(getTodosBySelectedListId(state)),
  todos => values(todos),
);

export const getIncompletedTodos = createCustomSelector(
  state => filter(todo => !todo.completedAt)(getTodosBySelectedListId(state)),
  todos => values(todos),
);
