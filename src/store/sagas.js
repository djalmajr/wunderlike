import { put, takeEvery } from 'redux-saga/effects';
import * as actions from './actions';

function* handleClearMessage() {
  yield put(actions.notifySuccess('Message cleared from cache'));
}

function* handleSaveMessage() {
  yield put(actions.notifySuccess('Message saved to cache'));
}

export default function* () {
  yield takeEvery(actions.clearMessage.toString(), handleClearMessage);
  yield takeEvery(actions.saveMessage.toString(), handleSaveMessage);
}
