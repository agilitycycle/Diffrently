import axios from 'axios';
import { takeEvery, select, call, put } from 'redux-saga/effects';
import { fbdb } from './firebase';
import { ref, query, get } from 'firebase/database';
import { updateAppState, appState } from './appSlice';

let called = false;

export default function* mySaga () {
  // app/updateAppState
  yield takeEvery(updateAppState().type, sagaWatch);
}

// redux, update tag categories **
function updateTagCategories (userId) {
  axios
    .get(`https://request-bf66wb3ria-ue.a.run.app?userId=${userId}`, {
      responseType: 'text',
    })
    .then(function (response) {
      console.log(response.data);
    });
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
    const currentAppState = yield select(appState);
    const { activeSubscriptions, loggedIn, userId } = currentAppState;
    if (!loggedIn) return; // do no sagas
    const subscriptions = yield call(getSubscriptions, activeSubscriptions, userId);
    // get new tag categories **
    yield call(updateTagCategories, userId);
    const newAppState = Object.assign({...currentAppState}, {
      subscriptions
    });
    updateAppState(newAppState);
    yield put(updateAppState(newAppState));
  }
}