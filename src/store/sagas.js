import { takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

function* handleDeleteTodo() {
  // yield put(actions.notifySuccess('Todo cleared from cache'));
}

function* handleSaveTodo() {
  // yield put(actions.notifySuccess('Todo saved to cache'));
}

export default function* () {
  yield takeEvery(actions.deleteTodo.toString(), handleDeleteTodo);
  yield takeEvery(actions.saveTodo.toString(), handleSaveTodo);
}
