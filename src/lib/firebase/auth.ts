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
import { getFirebaseApp } from './client';

// Initialize Firebase Auth and export it
// This will be null on the server and an auth instance on the client.
const app = getFirebaseApp();
export const auth = app ? getAuth(app) : (null as any); // Type assertion to avoid errors in components

export { 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
};

export type { User };
