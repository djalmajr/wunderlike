import { get } from 'lodash';
import { curry, filter, keys } from 'lodash/fp';
import { createSelectorCreator, defaultMemoize } from 'reselect';

const getState = curry((attr, state) => get(state, attr));

const filters = {
  completed: todo => !!todo.completedAt,
  uncompleted: todo => !todo.completedAt,
};

const createCustomSelector = createSelectorCreator(
  defaultMemoize,
  (a, b) => keys(a).length === keys(b).length,
);

export const getLists = getState('lists');

export const getSelectedListId = getState('selectedListId');

export const getTodoIdsInList = getState('todoIdsInList');

export const getTodoIdsByListId = createCustomSelector(
  (listId, state) => getTodoIdsInList(state)[listId],
  todoIds => todoIds,
);

export const getTodoIdsFromSelectedList = createCustomSelector(
  state => getTodoIdsByListId(getSelectedListId(state), state),
  todoIds => todoIds,
);

export const getTodoIdsFromSelectedListByStatus = createCustomSelector(
  (status, state) => filter(filters[status])(getTodoIdsFromSelectedList(state)),
  todoIds => todoIds,
);

export const getTodoById = todoId => getState(`todos.${todoId}`);
