import { useEffect, useState } from "react";
import { obtenerDatosColeccion } from "@/fciones/obtenerDatosColeccion";

 type Coleccion = {
        caracteristica: string | string[];
        titulo: string;
        descripcion: string;
        nombre_archivo?: string;
        autor?: string;
        fecha?: string;
        categoria?: string;


    };
export function useDetalleColeccion(id: string | string[]) {
    const [coleccion, setColeccion] = useState<Coleccion | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            setLoading(true);

            const query = Array.isArray(id) ? id[0] : id;
            const datos = await obtenerDatosColeccion(`listar_Detalle.php?id=${query}`);

            setColeccion(datos);
            setLoading(false);
        };

        if (id) cargar();
    }, [id]);

    return { coleccion, loading };
}