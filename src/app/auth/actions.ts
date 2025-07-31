'use server';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/auth';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const emailSchema = z.string().email({ message: 'Please enter a valid email address.' });
const passwordSchema = z.string().min(6, { message: 'Password must be at least 6 characters long.' });

const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
    email: emailSchema,
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

  try {
    await createUserWithEmailAndPassword(auth, parsed.data.email, parsed.data.password);
  } catch (e: any) {
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

    try {
        await signInWithEmailAndPassword(auth, parsed.data.email, parsed.data.password);
    } catch (e: any) {
        return {
            success: false,
            error: { _form: [e.message] },
        };
    }

    redirect('/dashboard');
}

export async function logoutAction() {
    await signOut(auth);
    redirect('/login');
}
