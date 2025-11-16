import { createContext, useState, useEffect, ReactNode } from "react";

type Usuario = {
  nombre: string | null;
  //apellido: string | null;
  //email: string | null;
  premium: boolean;
};

type UserContextType = {
  usuario: Usuario;
  setUsuario: (user: Usuario) => void;
  esPremium: boolean;
  setEsPremium: (value: boolean) => void;
  //logueado: boolean;
  //setLogueado: (value: boolean) => void;
};

export const UsuarioContext = createContext<UserContextType | undefined>(undefined);

export function PremiunProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: null,
   // apellido: null,
    //email: null,
    premium: false,
  });

  const [esPremium, setEsPremium] = useState(false);

  
  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const res = await fetch("https://tu-api.com/usuario");
        const data = await res.json();

        setUsuario({
          nombre: data.nombre,
          //apellido: data.apellido,
          //email: data.email,
          premium: data.premium,
        });

        
        setEsPremium(data.premium);
      } catch (e) {
        console.log("Usuario no logueado");
      }
    };

    cargarUsuario();
  }, []);

  return (
    <UsuarioContext.Provider
      value={{
        usuario,
        setUsuario,
        esPremium,
        setEsPremium,
        //logueado,
        //setLogueado,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}