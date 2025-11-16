import { getAuth, User } from "firebase/auth";

export const actualizarUsuario= async(usuario: User | null ) => {
    console.log("Legooooooooo")
    try{
        if (!usuario?.uid) return;
        const respuesta = await fetch("http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/endpoints/actualizarUsuario.php?", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({
                        uidd: usuario.uid,
                        premiun: "1"
                    }).toString(),
                });
                const data = await respuesta.json();
                console.log('Usuario actualizado a premiun:', data);
    }catch(error){
        console.error('Error al actualizar usuario:', error);
    }
}