import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebase/auth';

export default async function Home() {
    const user = auth.currentUser;

    if(user) {
        redirect('/dashboard');
    } else {
        redirect('/login');
    }
}
