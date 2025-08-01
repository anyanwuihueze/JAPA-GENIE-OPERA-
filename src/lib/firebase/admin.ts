// src/lib/firebase/admin.ts
import { initializeApp, getApps, cert, App } from 'firebase-admin/app';

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

function initializeAdminApp(): App {
    const alreadyCreated = getApps().find(app => app.name === 'admin');
    if (alreadyCreated) {
        return alreadyCreated;
    }

    return initializeApp({
        credential: cert(serviceAccount),
    }, 'admin');
}

export { initializeAdminApp };
