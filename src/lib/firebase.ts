import { initializeApp } from 'firebase/app';
import {
  initializeFirestore,
  memoryLocalCache
} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

const databaseId = firebaseConfig.firestoreDatabaseId || '(default)';

// Initialize Firestore with memory cache & long polling for safe execution in browser/iframes.
// (Auto-detect was tried here to shave mobile latency, but AI Studio's own preview runs the
// app inside an iframe where the streaming transport fails outright, so force is kept.)
export const db = initializeFirestore(
  app,
  {
    localCache: memoryLocalCache(),
    experimentalForceLongPolling: true
  },
  databaseId
);

// Google Sign-In, used to gate the site's admin edit mode. Whether a signed-in
// account may actually edit content is checked in AdminContext.tsx (who sees the
// UI) and in firestore.rules (who can actually write data).
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
