import { createAction } from 'redux-actions';

export const deleteTodo = createAction('delete-todo');
export const saveTodo = createAction('save-todo');
export const toggleCompleted = createAction('toggle-completed');
export const toggleStarred = createAction('toggle-starred');
