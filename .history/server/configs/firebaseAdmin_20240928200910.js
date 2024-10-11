import admin from "firebase-admin";

if (!admin.apps.length) {

    const serviceAccount = require("./tiensapp2-firebase-adminsdk-utlyn-e7c87c6840.json");
    


    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

export const storage = admin.storage();
export const firestore = admin.firestore();

export default admin;   