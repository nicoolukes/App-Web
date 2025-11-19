import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../credenciales";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { actualizarUsuario } from "../fciones/actualizarUsuario";
import { User } from "firebase/auth";


export function useUsuario(usuarioContext: any) {
  const [user, setUsuario] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
        });
    return unsubscribe;
  }, []);

  const cerrarSesion = async () => {
    await signOut(auth);
    setUsuario(null);
  };
  

  const activarBiometria = async (user:any) => {
    if (!user?.uid) return;
    const active = await AsyncStorage.getItem("biometria_activada") === "true";
    await AsyncStorage.setItem("biometria_activada", active ? "false" : "true");
  };

  const desactivarPremiun = async () => {
    await actualizarUsuario(user, false);
    if (usuarioContext.cargarUsuario) await usuarioContext.cargarUsuario();
  };

  return { user, cerrarSesion, activarBiometria, desactivarPremiun };
}