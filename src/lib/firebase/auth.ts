// src/lib/firebase/auth.ts
import {
  getAuth,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { firebaseApp } from './client';

export const auth = getAuth(firebaseApp);

export function onAuthStateChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
