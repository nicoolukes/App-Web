export default function generarTexto(coleccion:any){
    if (!coleccion) return "";

    return `
        Título: ${coleccion.titulo || "sin título"}.
        Descripción: ${coleccion.descripcion || "sin descripción"}.
        Características: ${
            Array.isArray(coleccion.caracteristica)
                ? coleccion.caracteristica.join(", ")
                : coleccion.caracteristica
        }.
        Autor: ${coleccion.autor || "desconocido"}.
        Fecha: ${coleccion.fecha || "no especificada"}.
        Categoría: ${coleccion.categoria || "sin categoría"}.
    `;

}