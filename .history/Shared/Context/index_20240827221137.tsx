import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../server/configs/firebase';
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Firestore importu
import { addData } from '../../server/helper/addData'; // addData fonksiyonunu import et

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
    const [useer, setUser] = useState(null);

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Google Sign-In Result:", result);

            const credential = GoogleAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
           
            
            console.log("accessToken",accessToken);
            

            // Firestore bağlantısını kur
            const db = getFirestore();

            // Kullanıcı bilgilerini firestore'daki USERS_HASH_PASSWORD koleksiyonuna ekle
            const userInfo = {
                email: result.user.email,
                phoneNumber: result.user.phoneNumber || null,
                password: null // Google Sign-In için şifre kullanmıyoruz
            };

            await setDoc(doc(db, "users-hash-password", result.user.uid), userInfo);

            localStorage.setItem('access_token', accessToken);
            setUser(result.user);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    const logOut = async () => {
        await signOut(auth);
        localStorage.removeItem('access_token');
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log("User signed in:", currentUser);
                setUser(currentUser);
                currentUser.getIdToken().then((token) => {
                    console.log("User Token:", token);
                    localStorage.setItem("access_token", token);
                });
            } else {
                console.log("User signed out");
                setUser(null);
                localStorage.removeItem("access_token");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ useer, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
