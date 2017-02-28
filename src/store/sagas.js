import { takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

function* handleCreateTodo() {
  // yield put(actions.notifySuccess('Todo saved to cache'));
}

function* handleRemoveTodo() {
  // yield put(actions.notifySuccess('Todo cleared from cache'));
}

export default function* () {
  yield takeEvery(actions.createTodo.toString(), handleCreateTodo);
  yield takeEvery(actions.removeTodo.toString(), handleRemoveTodo);
}
