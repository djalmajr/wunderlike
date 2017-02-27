import { get } from 'lodash';
import { curry } from 'lodash/fp';
// import { createSelectorCreator, defaultMemoize } from 'reselect';

const getState = curry((attr, state) => get(state, attr));

// const createCustomSelector = createSelectorCreator(
//   defaultMemoize,
//   (a, b) => keys(a).length === keys(b).length,
// );

export const getLists = getState('lists');
export const getTodos = getState('todos');
export const getSelectedListId = getState('selectedListId');
export const getTodoIdsInList = getState('todoIdsInList');
export const getTodoById = todoId => getState(`todos.${todoId}`);

export const getTodoIdsByListId = curry(
  (listId, state) => getTodoIdsInList(state)[listId],
);

export const getTodoIdsFromSelectedList = (
  state => getTodoIdsByListId(getSelectedListId(state), state)
);

export const getTodoIdsFromSelectedListByStatus = (
  (status, state) => getTodoIdsFromSelectedList(state)[status]
);
