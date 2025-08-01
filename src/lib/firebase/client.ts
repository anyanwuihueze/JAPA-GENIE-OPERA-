// src/lib/firebase/client.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { firebaseConfig } from './config';

let firebaseApp: FirebaseApp;

// This function ensures that we initialize the app only once
// and only on the client-side.
export function getFirebaseApp() {
  if (typeof window !== 'undefined') {
    if (!getApps().length) {
      firebaseApp = initializeApp(firebaseConfig);
    } else {
      firebaseApp = getApp();
    }
    return firebaseApp;
  }
  return null;
}
