import admin from "firebase-admin";

if (!admin.apps.length) {

    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as String);
    


    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;   