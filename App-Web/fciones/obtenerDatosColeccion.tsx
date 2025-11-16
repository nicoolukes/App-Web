import { Text } from "react-native";

const API_URL= 'http://192.168.1.134/App/App-Web/API_Proyecto/endpoints';

export const obtenerDatosColeccion = async(query: string ) => {

   try{
        
        const respuesta = await fetch (`${API_URL}/${query}`);
        
        if(!respuesta.ok){
            throw new Error(`Error HHTP: ${respuesta.status}`)
        }
        
        const datosColeccion = await respuesta.json();

        return datosColeccion;
    }catch(error){
        console.error("fallos al obtener datos de la coleccion", error);

        return{
            nombre: query,
            caracteristica: "erro al obtener la caracteristicas",
            error:true

        }

    }


}