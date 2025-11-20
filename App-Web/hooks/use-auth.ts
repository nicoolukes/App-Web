import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/credenciales";
import { User } from "firebase/auth";

export function useAuthUser() {
    const [user, setUsuario] = useState<User | null>(null);

    useEffect(() => {
        const dejarDeEscuchar = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
        });
        return dejarDeEscuchar;
    }, []);
//console.log("USUARIOO:", user)

    return user;
}