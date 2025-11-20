import { useEffect, useState } from "react";
import { guradarLike, verificarLike } from "@/fciones/guardarLike";

export function useLike(user:any, id: string | string []) {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const cargarLike = async () => {
            if (!user) return;
            const data = await verificarLike(user.uid, id);
            setIsLiked(data.liked);
        };
        cargarLike();
    }, [user, id]);

    const like = async () => {
        if (!user) return alert("Debe iniciar sesión");

        const resp = await guradarLike(user.uid, id, !isLiked);
        if (resp.success) setIsLiked(!isLiked);
    };

    return { isLiked, like };
}