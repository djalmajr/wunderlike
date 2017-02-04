import { createAction } from 'redux-actions';

export const clearMessage = createAction('clear-message');
export const saveMessage = createAction('save-message');
export const notifyError = createAction('notify-error');
export const notifySuccess = createAction('notify-success');
