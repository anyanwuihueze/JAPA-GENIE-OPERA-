import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { initializeAdminApp } from '@/lib/firebase/admin';

export default async function Home() {
    const session = cookies().get('session')?.value;

    if (!session) {
        redirect('/login');
    }

    try {
        initializeAdminApp();
        await getAuth().verifySessionCookie(session, true);
        redirect('/dashboard');
    } catch (error) {
        // Session cookie is invalid, expired, etc.
        redirect('/login');
    }
}
