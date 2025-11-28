import { auth } from "../services/firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
 } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

export type UserContextType = {
    user: { uid: string; email: string | null } | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: {children: ReactNode}) {
    const [user, setUser] = useState<UserContextType["user"] | null>(null);
    const [loading, setLoading] = useState(true);


    async function register(email: string, password: string) {
        await createUserWithEmailAndPassword(auth, email, password);
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