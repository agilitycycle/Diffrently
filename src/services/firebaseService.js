import { fbdb } from '../app/firebase';
import {
  push,
  update,
  set,
  ref,
  query,
  orderByKey,
  limitToLast,
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

const fbOnValue = (path) => {
  const r = ref(fbdb, path);
  const q = query(r, orderByKey(), limitToLast(5));
  return new Promise((resolve) => {
    onValue(q, (snapshot) => {
      if(snapshot.val()) {
        resolve(snapshot.val());
      }
    });
  })
}

export {
  fbPush,
  fbUpdate,
  fbSet,
  fbOnValue
}