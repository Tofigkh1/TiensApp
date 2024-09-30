import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { getFirestore, listCollections, collection, getDocs } from 'firebase/firestore';




const firebaseConfig = {
  apiKey: "AIzaSyCQhXQckGOqJWvjcO4lIsIiyEq4IZ2B5zQ",
  authDomain: "tiensapp2.firebaseapp.com",
  projectId: "tiensapp2",
  storageBucket: "tiensapp2.appspot.com",
  messagingSenderId: "819662679485",
  appId: "1:819662679485:web:9264b7c8def51d771fb6d4",
  measurementId: "G-5FR3WWP0XZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

export async function getAllCollections() {
  const collectionList = [];
  try {
    const collectionsSnapshot = await listCollections(db);
    for (const collectionRef of collectionsSnapshot) {
      const querySnapshot = await getDocs(collection(db, collectionRef.id));
      const docsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      collectionList.push({ collectionName: collectionRef.id, docsData });
    }
    return collectionList;
  } catch (error) {
    console.error("Error getting collections: ", error);
    return [];
  }
}


