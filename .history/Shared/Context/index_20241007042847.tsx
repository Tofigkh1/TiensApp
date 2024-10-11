import React, { useContext, createContext, useState, useEffect, ReactNode } from "react"; // ReactNode'u ekleyin
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../server/configs/firebase';

interface AuthContextType {
    user: any; // Kullanıcı tipini burada belirleyebilirsiniz
    googleSignIn: () => Promise<void>;
    logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null); // Başlangıç değeri olarak null

export const AuthContextProvider = ({ children }: { children: ReactNode }) => { // ReactNode türünü kullandık
    const [user, setUser] = useState<any>(null); // Kullanıcı durumunu başlatın

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const accessToken = credential?.accessToken;

        localStorage.setItem('access_token', accessToken); // access_token'ı kaydet

        setUser(result.user);
    };

    const logOut = async () => {
        await signOut(auth);
        localStorage.removeItem('access_token'); // Çıkış yapıldığında access_token'ı sil
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, googleSignIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth:null = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return context;
};
