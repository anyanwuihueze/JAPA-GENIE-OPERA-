import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';
import { initializeAdminApp } from '@/lib/firebase/admin';

export default async function Home() {
    // Check for session cookie
    const session = cookies().get('session')?.value;
    if (!session) {
        redirect('/login');
    }

    // Verify session cookie
    try {
      initializeAdminApp();
      await getAuth().verifySessionCookie(session, true);
      redirect('/dashboard');
    } catch (error) {
      redirect('/login');
    }
}
