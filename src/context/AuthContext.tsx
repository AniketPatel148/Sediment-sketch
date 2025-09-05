import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../lib/firebase";

type AuthCtx = {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({ user: null, loading: true, logout: async () => { } });
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
    }, []);

    const logout = () => signOut(auth);

    return <Ctx.Provider value={{ user, loading, logout }}>{children}</Ctx.Provider>;
}
