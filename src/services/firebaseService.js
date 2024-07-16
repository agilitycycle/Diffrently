import { fbdb } from '../app/firebase';
import {
  push,
  update,
  set,
  ref,
  query,
  orderByKey,
  orderByChild,
  limitToFirst,
  limitToLast,
  equalTo,
  onValue
} from 'firebase/database';

const fbPush = (path, values) => {
  return push(ref(fbdb, path), values).key;
}

const fbUpdate = (path, values) => {
  return update(ref(fbdb, path), values);
}

const fbSet = (path, values) => {
  set(ref(fbdb, path), values);
}

const fbOnValueOrderByKeyLimitToFirst = (path, limit) => {
  const r = ref(fbdb, path);
  const q = query(r, orderByKey(), limitToFirst(limit));
  return new Promise((resolve) => {
    onValue(q, (snapshot) => {
      if(snapshot.val()) {
        resolve(snapshot.val());
      }
    });
  })
}

const fbOnValueOrderByChildLimitToFirst = (path, orderByChildValue, equalToValue, limit) => {
  const r = ref(fbdb, path);
  const q = query(r, orderByChild(orderByChildValue), equalTo(equalToValue), limitToFirst(limit));
  return new Promise((resolve) => {
    onValue(q, (snapshot) => {
      if(snapshot.val()) {
        resolve(snapshot.val());
      }
      if(snapshot.val() === null) {
        resolve(false);
      }
    });
  })
}

const fbOnValueOrderByChildLimitToLast = (path, orderByChildValue, equalToValue, limit) => {
  const r = ref(fbdb, path);
  const q = query(r, orderByChild(orderByChildValue), equalTo(equalToValue), limitToLast(limit));
  return new Promise((resolve) => {
    onValue(q, (snapshot) => {
      if(snapshot.val()) {
        resolve(snapshot.val());
      }
      if(snapshot.val() === null) {
        resolve(false);
      }
    });
  })
}

const fbOnValueOrderByChild = (path, orderByChildValue, equalToValue) => {
  const r = ref(fbdb, path);
  const q = query(r, orderByChild(orderByChildValue), equalTo(equalToValue));
  return new Promise((resolve) => {
    onValue(q, (snapshot) => {
      if(snapshot.val()) {
        resolve(snapshot.val());
      }
      if(snapshot.val() === null) {
        resolve(false);
      }
    });
  })
}

export {
  fbPush,
  fbUpdate,
  fbSet,
  fbOnValueOrderByChildLimitToFirst,
  fbOnValueOrderByKeyLimitToFirst,
  fbOnValueOrderByChildLimitToLast,
  fbOnValueOrderByChild
}