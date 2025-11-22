import { getAuth, User } from "firebase/auth";
import {API_URL} from "../src/config/config"

export const actualizarUsuario= async(usuario: User | null, premiunn: boolean ) => {
    //console.log("Legooooooooo")
    try{
        if (!usuario?.uid) return;
        const respuesta = await fetch(`${API_URL}/endpoints/actualizarUsuario.php?`, {
                    method: "POST",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({
                        uidd: usuario.uid,
                        premiun: premiunn ? "1":"0"
                    }).toString(),
                });
                const data = await respuesta.json();
                //console.log('Usuario actualizado a premiun:', data);
    }catch(error){
        console.error('Error al actualizar usuario:', error);
    }
}