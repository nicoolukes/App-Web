import * as Speech from "expo-speech";
import { useState } from "react";
import generarTexto from "@/fciones/generarTexto";
export function useSpeech() {
    const [reading, setReading] = useState(false);

    const leer = (coleccion:any) => {
        const texto = generarTexto(coleccion);
        setReading(true);
        Speech.speak(texto, {
            language: "es-ES",
            rate: 1.0,
            onDone: () => setReading(false),
            onStopped: () => setReading(false)
        });
    };

    const detener = () => {
        Speech.stop();
        setReading(false);
    };

    return { reading, leer, detener };
}