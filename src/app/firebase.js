import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const {
  REACT_APP_DEV_API_KEY,
  REACT_APP_DEV_AUTH_DOMAIN,
  REACT_APP_DEV_DATABASE_URL,
  REACT_APP_DEV_PROJECT_ID,
  REACT_APP_DEV_STORAGE_BUCKET_ID,
  REACT_APP_DEV_MESSAGING_SENDER_ID,
  REACT_APP_DEV_APP_ID,
  REACT_APP_DEV_MEASUREMENT_ID,
  REACT_APP_PROD_MEASUREMENT_ID,
  REACT_APP_PROD_API_KEY,
  REACT_APP_PROD_AUTH_DOMAIN,
  REACT_APP_PROD_DATABASE_URL,
  REACT_APP_PROD_PROJECT_ID,
  REACT_APP_PROD_STORAGE_BUCKET_ID,
  REACT_APP_PROD_MESSAGING_SENDER_ID,
  REACT_APP_PROD_APP_ID,
  REACT_APP_IS_DEV
} = process.env;

const dev = String(REACT_APP_IS_DEV) === 'true';

const config = {
	apiKey: (dev) ? REACT_APP_DEV_API_KEY : REACT_APP_PROD_API_KEY,
	authDomain: (dev) ? REACT_APP_DEV_AUTH_DOMAIN : REACT_APP_PROD_AUTH_DOMAIN,
	databaseURL: (dev) ? REACT_APP_DEV_DATABASE_URL : REACT_APP_PROD_DATABASE_URL,
	projectId: (dev) ? REACT_APP_DEV_PROJECT_ID : REACT_APP_PROD_PROJECT_ID,
	storageBucket: (dev) ? REACT_APP_DEV_STORAGE_BUCKET_ID : REACT_APP_PROD_STORAGE_BUCKET_ID,
	messagingSenderId: (dev) ? REACT_APP_DEV_MESSAGING_SENDER_ID : REACT_APP_PROD_MESSAGING_SENDER_ID,
	appId: (dev) ? REACT_APP_DEV_APP_ID : REACT_APP_PROD_APP_ID,
	measurementId: (dev) ? REACT_APP_DEV_MEASUREMENT_ID : REACT_APP_PROD_MEASUREMENT_ID
}

const firebaseConfig = config;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const fbdb = getDatabase(app);
export const fbStorage = getStorage(app);