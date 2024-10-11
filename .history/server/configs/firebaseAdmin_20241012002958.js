import admin from "firebase-admin";

if (!admin.apps.length) {
    const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS
        ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS) // Çevresel değişkenden JSON verisi çekilir
        : null;

    if (serviceAccount) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } else {
        throw new Error("Firebase Admin SDK credentials not found!");
    }
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;
