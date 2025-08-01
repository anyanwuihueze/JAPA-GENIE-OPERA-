'use client';
// src/lib/firebase/auth.ts
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInAnonymously,
  type Auth,
  type User,
} from 'firebase/auth';
import { getFirebaseApp } from './client';

let authInstance: Auth | null = null;

// This function lazily initializes and returns the auth instance.
// It ensures that Firebase is only initialized on the client.
export function getFirebaseAuth() {
  if (typeof window === 'undefined') {
    return null;
  }
  if (!authInstance) {
    const app = getFirebaseApp();
    if (app) {
      authInstance = getAuth(app);
    }
  }
  return authInstance;
}


export { 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInAnonymously
};

export type { User };
