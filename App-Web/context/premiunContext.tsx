import { createContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import React from 'react';
import { auth } from "@/credenciales";
import { API_URL } from "@/src/config/config";


type Usuario = {
  nombre: string | null;
  //apellido: string | null;
  //email: string | null;
  premiun: boolean;
};

type UserContextType = {
  usuario: Usuario;
  setUsuario: (user: Usuario) => void;
  esPremiun: boolean;
  setEsPremium: (value: boolean) => void;
  cargarUsuario: () => Promise<void>; 
  //logueado: boolean;
  //setLogueado: (value: boolean) => void;
};

export const UsuarioContext = createContext<UserContextType | undefined>(undefined);

export default function PremiunProvider({ children }: { children: ReactNode }) {
  const [esPremiun, setEsPremium] = useState(false);
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: null,
   // apellido: null,
    //email: null,
    premiun: false,
  });
  const [user, setUser] = useState<User | null>(null);

   useEffect(() => {
  
          const unsubscribe = onAuthStateChanged(auth, (user) => {
              setUser(user);
          });
  
          return unsubscribe;
      }, []);
  
    const cargarUsuario = async () => {
     
      try {
        const res = await fetch(`${API_URL}/endpoints/traerUser.php?uidd=${user?.uid}`);
        const data = await res.json();
        
        setUsuario({
          nombre: data.nombre,
          //apellido: data.apellido,
          //email: data.email,
          premiun: data.premiun,
        });

        
        setEsPremium(data.premiun);
      } catch (e) {
        console.log("Usuario no logueado");
      }
    };
  

  useEffect(() => {
    cargarUsuario();
  }, [user]);

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
        esPremiun,
        setEsPremium,
        cargarUsuario,
        //logueado,
        //setLogueado,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}