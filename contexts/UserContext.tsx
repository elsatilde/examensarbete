import { auth, db } from "../services/firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
 } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createContext, ReactNode, useEffect, useState } from "react";
import { AppUser } from "../types/User.types";

export type UserContextType = {
    user: AppUser | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<string>;
    logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: {children: ReactNode}) {
    const [user, setUser] = useState<AppUser | null>(null);
    const [loading, setLoading] = useState(true);


    async function register(email: string, password: string) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const uid = userCredential.user.uid;

        await setDoc(doc(db, "users" , uid), {
          email,
          createdAt : serverTimestamp(),
        });
        
        return uid;
    }

    async function login(email: string, password: string) {
        await signInWithEmailAndPassword(auth, email, password);
    }

    async function logout() {
        await signOut(auth);
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (fbUser) => {
          if (fbUser) {
            setUser({ uid: fbUser.uid, email: fbUser.email });
          } else {
            setUser(null);
          }
          setLoading(false);
        });
    
        return () => unsub();
      }, []);

    return (
        <UserContext.Provider value={{ user, loading, login, register, logout}}>
            { children }
        </UserContext.Provider>
    )

}