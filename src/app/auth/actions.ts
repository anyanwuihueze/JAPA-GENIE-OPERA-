'use server';

import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { initializeAdminApp } from '@/lib/firebase/admin';

// Re-initialize the app on every server action
// to get the latest auth state.
initializeAdminApp();

const signUpSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export async function signUpAction(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }

  const { email, password } = parsed.data;

  try {
    const user = await getAuth().createUser({
      email,
      password,
      emailVerified: false, // You can set this to true if you implement email verification
    });

    // Create session cookie
    const idToken = await getAuth().createCustomToken(user.uid);
    const sessionCookie = await getAuth().createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days
    });
    cookies().set('session', sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

  } catch (e: any) {
     if (e.code === 'auth/email-already-exists') {
      return {
        success: false,
        error: { _form: ['A user with this email already exists.'] },
      };
    }
    return {
      success: false,
      error: { _form: [e.message] },
    };
  }

  redirect('/dashboard');
}

export async function loginAction(formData: FormData) {
  const data = Object.fromEntries(formData);
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.flatten().fieldErrors,
    };
  }
  
  // The client-side SDK will handle the actual sign-in
  // and the onAuthStateChanged listener will manage the user state.
  // This server action's primary role now is to create the session cookie
  // after the client successfully signs in. We'll need to call this
  // from the client after a successful `signInWithEmailAndPassword`.

  // For now, redirecting directly. We will adjust this flow.
  // The client needs to sign in first, get an ID token, and send it here.
  // This is a temporary placeholder to keep the UI flow working.
  // We'll fix this in the next step.
  redirect('/dashboard');
}


export async function createSessionCookie(idToken: string) {
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });
    cookies().set('session', sessionCookie, { httpOnly: true, secure: true });
}


export async function logoutAction() {
    cookies().delete('session');
    redirect('/login');
}