import admin from "firebase-admin";

if (!admin.apps.length) {

    const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS
        ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS)
        : require("./server/configs/tiensapp-92bab-firebase-adminsdk-lupd3-ff070b415d.json"); // Yerelde çalışırken bu kullanılabilir.

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;