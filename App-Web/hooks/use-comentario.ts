import { useEffect, useState } from "react";
import { guradarLike, verificarLike } from "@/fciones/guardarLike";

export function useComentario(user:any, id: string | string []) {
    const [isComented, setIsComented] = useState(false);

    const comentario = async () => {
        if (!user) return alert("Debe iniciar sesión");

       
    };

    return { isComented, comentario };
}