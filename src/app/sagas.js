import { takeEvery, select, call, put } from 'redux-saga/effects';
import { fbdb } from './firebase';
import { ref, query, get } from 'firebase/database';
import { updateAppState, appState } from './appSlice';

let called = false;

export default function* mySaga () {
  yield takeEvery(updateAppState().type, sagaWatch);
}

function getSubscriptions (activeSubscriptions, userId) {
  const userRef = ref(fbdb, `userSubscriptions/${userId}/subscriptions/${activeSubscriptions}`);
  const q = query(userRef);
  return new Promise((resolve) => {
    get(q)
      .then((snapshot) => {
        resolve(snapshot.val());
      })
      .catch((error) => {
        console.log(error);
      });
  })
}

function* sagaWatch () {
  if (!called) {
    called = true;
    /** check currentAppState */
    const currentAppState = yield select(appState);
    const { activeSubscriptions, userId } = currentAppState;
    const subscriptions = yield call(getSubscriptions, activeSubscriptions, userId);
    const newAppState = Object.assign({...currentAppState}, {
      subscriptions
    });
    updateAppState(newAppState);
    yield put(updateAppState(newAppState));
  }
}