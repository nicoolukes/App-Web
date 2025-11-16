import { useEffect, useState } from "react";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../credenciales";
import LoginScreen from "./Login";

export default function AuthLoading() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        router.replace("/(tabs)");
        
        return;
      }

      const usarBio = await AsyncStorage.getItem("biometria_activada");

      if (usarBio === "true") {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Autenticación requerida",
        });

        if (!result.success) {
          router.replace("/Login");
          setDone(true);
          return;
        }
      }

      router.replace("/(tabs)");
      setDone(true);
    });

    return unsub;
  }, []);

  if (!done) return <LoginScreen />;
}