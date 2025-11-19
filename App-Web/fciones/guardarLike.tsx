
export const guradarLike = async (usid: any, idColect: string | string[], like: boolean) => {
    try {
        console.log("entro al guardar")
        const response = await fetch(
            `http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/endpoints/guardarLike.php`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usid, idColect, like })
            }
        );
        return await response.json();
    }catch{
        console.log("errorrrrrrrrrrrrrr")
    }
    
}

export const verificarLike = async(usid: any, idColect:String | string[]) =>{
    try{
        const response = await fetch(
        `http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/endpoints/verificarLike.php?uidd=${usid}&id_imagen=${idColect}`
    );

    return await response.json();
    }catch{

    }
}