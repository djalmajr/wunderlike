import { createAction } from 'redux-actions';

export const createTodo = createAction('create-todo');
export const removeTodo = createAction('remove-todo');
export const updateTodo = createAction('update-todo');
export const changeList = createAction('change-list');
export const toggleCompleted = createAction('toggle-completed');
export const toggleStarred = createAction('toggle-starred');
