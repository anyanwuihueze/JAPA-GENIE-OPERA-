'use server';

import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { initializeAdminApp } from '@/lib/firebase/admin';

export async function createSessionCookie(idToken: string) {
    initializeAdminApp();
    // Session cookie expires in 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });
    cookies().set('session', sessionCookie, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
}

export async function logoutAction() {
    cookies().delete('session');
    redirect('/login');
}
