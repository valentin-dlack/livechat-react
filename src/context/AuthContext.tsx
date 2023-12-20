import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

interface AuthContextType {
    currentUser: User | null;
  }
  

export const AuthContext = createContext<AuthContextType>({ currentUser: null });

interface AuthContextProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsub();
        }
    }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};