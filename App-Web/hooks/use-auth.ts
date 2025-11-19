import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/credenciales";
import { User } from "firebase/auth";

export function useAuthUser() {
    const [user, setUsuario] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
        });
        return unsubscribe;
    }, []);


    return user;
}