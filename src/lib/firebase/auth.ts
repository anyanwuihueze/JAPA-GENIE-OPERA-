'use client';
// src/lib/firebase/auth.ts
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth';
import { firebaseApp } from './client';

export const auth = getAuth(firebaseApp);

export { 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
};

export type { User };