import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, Text, View } from "react-native";
import { obtenerDatosColeccion } from "@/fciones/obtenerDatosColeccion"
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import { BlurView } from "expo-blur";
import Header from "@/components/Header";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
import { Button } from "react-native";

export default function DetalleColeccion() {
    type Coleccion = {
        caracteristica: string | string[];
        titulo: string;
        descripcion: string;
        nombre_archivo?: string;
        autor?: string;
        fecha?: string;
        categoria?: string;


    };
    const { id } = useLocalSearchParams()
    const [coleccion, setColeccion] = useState<Coleccion | null>(null);
    const [cargando, setCargando] = useState(false);

    type Comentario = {
        usuario: string;
        texto: string;
    };

    const [comentarios, setComentarios] = useState<Comentario[]>([]);

    // FUNCIÓN PARA LEER: en voz alta 
    const leerInformacion = () => {
        if (!coleccion) return;

        const texto = `
    Título: ${coleccion.titulo || "sin título"}.
    Descripción: ${coleccion.descripcion || "sin descripción"}.
    Características: ${Array.isArray(coleccion.caracteristica)
                ? coleccion.caracteristica.join(", ")
                : coleccion.caracteristica
            }.
    Autor: ${coleccion.autor || "desconocido"}.
    Fecha: ${coleccion.fecha || "no especificada"}.
    Categoría: ${coleccion.categoria || "sin categoría"}.
  `;

        Speech.speak(texto, {
            language: "es-ES",
            rate: 1.0,
            pitch: 1.0,
        });
    };

    // ⏹️ FUNCIÓN PARA DETENER
    const detenerLectura = () => {
        Speech.stop();
    };



    useEffect(() => {
        const cargarDatos = async () => {
            setCargando(true);
            console.log("holaa detalle:");



            // Si no hay nombre válido, evitamos la petición
            if (!id) {
                setColeccion(null);
                setCargando(false);
                return;
            }
            const query = Array.isArray(id) ? id[0] : id;
            const datos = await obtenerDatosColeccion(`listar_Detalle.php?id=${query}`);

            setColeccion(datos);

            setCargando(false);
        };
        if (id) {
            cargarDatos();
        }


    }, [id])

    const renderCaracteristicaTags = () => {
        // Si está cargando, mostramos el indicador
        if (cargando) {
            return <ActivityIndicator size="large" color="#545467ff" />;
        }

        if (!coleccion?.caracteristica) {
            return <Text >No se encontraron características.</Text>;
        }

        const caracteristicasArray = Array.isArray(coleccion.caracteristica)
            ? coleccion.caracteristica
            : coleccion.caracteristica.split(',');

        return caracteristicasArray.map((c, index) => (
            <View key={index} >
                <Text >{c.trim()}</Text>
            </View>
        ));
    };


    return (


        <ThemedView style={styles.container}>

            <ImageBackground
                source={{ uri: `http://192.168.1.134/App/App-Web/API_Proyecto/uploads/${coleccion?.nombre_archivo}` }}
                style={styles.background}
                blurRadius={10} // si no usás expo-blur
            >
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.03)', 'rgba(0, 0, 0, 0)']}
                    style={StyleSheet.absoluteFillObject}
                />
                <Header />

                <BlurView intensity={50} style={styles.blurOverlay}>
                    {/* Scroll general para que no se corte el contenido */}
                    {/* Imagen y título fijos */}
                    <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 60 }}>

                        <Image
                            style={styles.imagen}
                            source={{ uri: `http://192.168.1.134/App/App-Web/API_Proyecto/uploads/${coleccion?.nombre_archivo}` }}
                        />
                        <ThemedText style={styles.titulo}>{coleccion?.titulo}</ThemedText>
                        {/* Botones circulares */}
                        <View style={styles.botonera}>
                            <TouchableOpacity style={styles.botonCircular} onPress={leerInformacion}>
                                <Text style={styles.iconoBoton}>🔈</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.botonCircular, { backgroundColor: "rgba(235, 182, 102, 1)" }]}
                                onPress={detenerLectura}
                            >
                                <Text style={styles.iconoBoton}>⏹</Text>
                            </TouchableOpacity>
                        </View>


                        {/* Slider horizontal de infoCards */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={true}
                            contentContainerStyle={styles.sliderContainer}
                        >
                            {/* Descripción */}

                            <ThemedView style={styles.infoCard}>
                                <ScrollView style={{ backgroundColor: '0000' }}>
                                    <ThemedText style={styles.subtitle}>Descripción:</ThemedText>
                                    <ThemedText type="defaultSemiBold">
                                        {coleccion?.descripcion}
                                    </ThemedText>
                                </ScrollView>

                            </ThemedView>

                            {/* Características */}
                            <ThemedView style={styles.infoCard}>
                                <ScrollView>
                                    <ThemedText style={styles.subtitle}>Características:</ThemedText>
                                    <ThemedView style={styles.tagsWrapper}>
                                        {renderCaracteristicaTags()}
                                    </ThemedView>
                                </ScrollView>

                            </ThemedView>

                            {/* Información adicional */}
                            <ThemedView style={styles.infoCard}>
                                <ScrollView>
                                    <ThemedText style={styles.subtitle}>Información:</ThemedText>
                                    <ThemedText type="defaultSemiBold">
                                        Autor: {coleccion?.autor}{'\n'}
                                        Fecha: {coleccion?.fecha}{'\n'}
                                        Tipo: {coleccion?.categoria}{'\n'}
                                    </ThemedText>
                                </ScrollView>

                            </ThemedView>

                        </ScrollView>

                        {/* Comentarios */}
                        <ThemedView style={styles.comentarios}>
                            <ThemedText style={styles.subtitle}>Comentarios:</ThemedText>
                            <ScrollView style={{ maxHeight: 200 }}>
                                {comentarios.length > 0 ? (
                                    comentarios.map((comentario, index) => (
                                        <View key={index} style={styles.comentarioCard}>
                                            <Text style={styles.comentarioUser}>{comentario.usuario}</Text>
                                            <Text style={styles.comentarioText}>{comentario.texto}</Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text style={{ color: '#ccc' }}>Aún no hay comentarios.</Text>
                                )}
                            </ScrollView>
                        </ThemedView>
                    </ScrollView>
                </BlurView>
            </ImageBackground>
        </ThemedView>


    );
}


const styles = StyleSheet.create({
    botonera: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
        marginVertical: 10,
    },

    botonCircular: {
        backgroundColor: "#b6ec8f7a",
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 6,
    },

    iconoBoton: {
        color: "#fff",
        fontSize: 20
    },

    container: {
        flex: 1,
        backgroundColor: '#00000006',
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
        backgroundColor: '#00000008',
    },
    blurOverlay: {
        flex: 1,
        paddingTop: 24,
        paddingHorizontal: 10,
        backgroundColor: '#0000008f',
        alignItems: 'center',

    },
    imagen: {
        width: '85%',
        height: 380,
        borderRadius: 20,
        marginTop: 100,
        resizeMode: 'cover',
        shadowColor: '#000',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 10,

    },
    titulo: {
        paddingVertical: 8,
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
        textAlign: 'center',
        marginVertical: 16,
    },
    sliderContainer: {
        paddingHorizontal: 10,
        backgroundColor: '0000',

    },
    infoCard: {
        width: 300,
        marginRight: 16,
        marginBottom: 16,
        padding: 18,
        borderRadius: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // efecto vidrio
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 8,

    },
    subtitle: {
        marginBottom: 8,
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
    tagsWrapper: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    comentarios: {
        width: '90%',
        marginTop: 24,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    comentarioCard: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
    },
    comentarioUser: {
        color: '#fff',
        fontWeight: 'bold',
    },
    comentarioText: {
        color: '#ddd',
        marginTop: 4,
    },


});