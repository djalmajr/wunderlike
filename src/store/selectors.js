import { get } from 'lodash';
import { curry, filter, keys } from 'lodash/fp';
import { createSelectorCreator, defaultMemoize } from 'reselect';

const getState = curry((attr, state) => get(state, attr));
const createCustomSelector = createSelectorCreator(
  defaultMemoize,
  (a, b) => keys(a).length === keys(b).length,
);

export const getLists = getState('lists');
export const getListsLen = getState('listsLen');
export const getTodos = getState('todos');
export const getSelectedListId = getState('selectedListId');
export const getTodoIdsInList = getState('todoIdsInList');
export const getTodoById = id => getState(`todos.${id}`);

export const getTodoIdsByListId = curry(
  (listId, state) => getTodoIdsInList(state)[listId],
);

const _createSelector = fnFilter => createCustomSelector(
  (listId, state) => fnFilter(
    getTodoIdsByListId(listId, state).map(id => getTodoById(id)(state)),
  ),
  todoIds => todoIds.map(({ id }) => id),
);

export const getCompletedTodoIds = _createSelector(filter(({ completedAt }) => completedAt));
export const getUncompletedTodoIds = _createSelector(filter(({ completedAt }) => !completedAt));
