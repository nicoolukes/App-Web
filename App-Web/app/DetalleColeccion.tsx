import { ThemedView } from "@/components/themed-view";
import { useEffect, useState } from "react";
import { StyleSheet, ActivityIndicator, Text, View, Modal } from "react-native";
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
import { FlatList, ListRenderItem, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import * as Speech from "expo-speech";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import React from 'react';
import { auth } from "@/credenciales";
import { guradarLike, verificarLike } from "@/fciones/guardarLike";
//import MediaCarousel from "./MediaCarousel";
import { useDetalleColeccion } from "../hooks/use-detalleColec";
import { useAuthUser } from "../hooks/use-auth";
import { useLike } from "../hooks/use-like";
import { useSpeech } from "../hooks/use-speech"
import generarTexto from "@/fciones/generarTexto";



type MediaItem = {
    type: "image" | "video";
    uri: string;
};

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;


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
    type Comentario = {
        usuario: string;
        texto: string;
    };

   //const [isLiked, setLiked] = useState(false);
    //const [isReading, setIsReading] = useState(false);
    //const { id } = useLocalSearchParams()
    //const { premiun } = useLocalSearchParams()
    //const [coleccion, setColeccion] = useState<Coleccion | null>(null);
    const [cargando, setCargando] = useState(false);
    const [modalVisible, setVisibleModal] = useState(false);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    //const [user, setUsuario] = useState<User | null>(null);

    const { id, premiun } = useLocalSearchParams();
    const { coleccion, loading } = useDetalleColeccion(id);
    const user = useAuthUser();
    const { isLiked, like } = useLike(user, id);
    const { reading, leer, detener } = useSpeech();

   

    console.log("es premiunn:", premiun);
    


   /* useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
        });


        return unsubscribe;
    }, []);*/

    // FUNCIÓN PARA LEER: en voz alta 
   /* const leerInformacion = () => {
        if (!coleccion) return;

       texto = generarTexto(coleccion);
        /*const texto = `
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
        setIsReading(true);

        Speech.speak(texto, {
            language: "es-ES",
            rate: 1.0,
            pitch: 1.0,
            onDone: () => setIsReading(false),
            onStopped: () => setIsReading(false),
        });
    };

    // ⏹️ FUNCIÓN PARA DETENER
    const detenerLectura = () => {
        Speech.stop();
        setIsReading(false);
    };*/
    /*
    useEffect(() => {
        const cargarDatos = async () => {
            setCargando(true);
            console.log("holaa detalle:", id);



            // Si no hay nombre válido, evitamos la petición
            if (!id) {
                setColeccion(null);
                setCargando(false);
                return;
            }
            const query = Array.isArray(id) ? id[0] : id;
            console.log("holaa detalle:", query);
            const datos = await obtenerDatosColeccion(`listar_Detalle.php?id=${query}`);

            setColeccion(datos);

            setCargando(false);
            console.log("Archivo recibido:", coleccion?.nombre_archivo);
        };
        if (id) {
            cargarDatos();
        }


    }, [id])*/

    const renderCaracteristicaTags = () => {
        // Si está cargando, mostramos el indicador
        if (cargando) {
            return <ActivityIndicator size="large" color="#545467ff" />;
        }

        if (!coleccion?.caracteristica) {
            return <ThemedText >No se encontraron características.</ThemedText>;
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


   /* useEffect(() => {
        const cargarLike = async () => {
            const UID = user?.uid;
            const data = await verificarLike(UID, id);
            setLiked(data.liked);
        };

        cargarLike();
    }, [id]);

    const like = async () => {
        const UID = user?.uid;
        if (user) {
            console.log("entro uid, id:", user?.uid, id);
            const data = await guradarLike(UID, id, !isLiked);

            if (data.success) {
                setLiked(!isLiked);
            }
        } else {
            alert("Debe iniciar sesion para dar Like")
        }

    }*/

    const Media: MediaItem[] = [{ type: "image", uri: `http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/${coleccion?.nombre_archivo}` }, { type: "video", uri: `http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/video1.mp4` }]

    const renderMedia: ListRenderItem<MediaItem> = ({ item }) => (
        <View style={styles.page}>
            {item.type === "image" ? (
                <Image
                    source={{ uri: item.uri }}
                    style={styles.fullMedia}
                    resizeMode="contain"
                />
            ) : (
                <>
                    <Video
                        source={{ uri: item.uri }}
                        style={styles.fullMedia}
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                    />

                    {premiun && !user && (
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => alert("Contenido disponible solo para usuarios Premium")}
                            style={styles.bloqueoPremium}
                        >
                            <Ionicons name="lock-closed" size={40} color="#fff" />
                            <Text style={{ color: "#fff", marginTop: 10, fontSize: 18 }}>
                                Contenido Premium
                            </Text>
                        </TouchableOpacity>
                    )}
                </>

            )}


        </View>
    );


    return (

        <>

            <ThemedView style={styles.container}>

                <ImageBackground
                    source={{ uri: `http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/${coleccion?.nombre_archivo}` }}
                    style={styles.background}
                    blurRadius={10} // si no usás expo-blur
                >
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.03)', 'rgba(0, 0, 0, 0)']}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <Header
                        title="Detalle de la colección"
                    />

                    <BlurView intensity={50} style={styles.blurOverlay}>
                        {/* Imagen y título fijos */}
                        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 60 }}>
                            <TouchableOpacity
                                onPress={() => setVisibleModal(true)}
                                style={{ width: "100%", alignItems: "center" }}
                            >
                                <Image
                                    style={styles.imagen}
                                    source={{ uri: `http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/${coleccion?.nombre_archivo}` }}
                                />

                            </TouchableOpacity>



                            <ThemedText style={styles.titulo}>{coleccion?.titulo}</ThemedText>



                            {/* Slider horizontal de infoCards */}
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={true}
                                contentContainerStyle={styles.sliderContainer}
                            >
                                <ThemedView style={styles.infoCard}>
                                    <ScrollView style={{ backgroundColor: '0000' }}>
                                        <ThemedText style={styles.subtitle}>Descripción:</ThemedText>
                                        <ThemedText type="defaultSemiBold">
                                            {coleccion?.descripcion}
                                        </ThemedText>
                                    </ScrollView>

                                </ThemedView>

                                <ThemedView style={styles.infoCard}>
                                    <ScrollView>
                                        <ThemedText style={styles.subtitle}>Características:</ThemedText>
                                        <ThemedView style={styles.tagsWrapper}>
                                            {renderCaracteristicaTags()}
                                        </ThemedView>
                                    </ScrollView>

                                </ThemedView>

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
                            <View style={styles.botonesFila}>

                                {/* ❤️ Me gusta */}
                                <TouchableOpacity onPress={()=>like()} style={styles.botonDelicado}
                                >
                                    <Ionicons
                                        name={isLiked && user ? "heart" : "heart-outline"}
                                        size={24}
                                        color={isLiked && user ? "red" : "#fff"}
                                    />
                                </TouchableOpacity>

                                {/* 🔊 Botón de audio */}
                                <TouchableOpacity
                                    onPress={() => {
                                        if (reading) detener();
                                        else leer(coleccion);
                                    }}
                                    style={styles.botonDelicado}

                                >
                                    {reading ? (
                                        <Entypo name="controller-stop" size={24} color="white" />
                                    ) : (
                                        <Feather name="volume-2" size={24} color="white" />
                                    )}
                                </TouchableOpacity>

                            </View>

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

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContent}>

                    {/* CARRUSEL */}
                    <FlatList
                        data={Media}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderMedia}
                    />

                    {/* BOTÓN CERRAR */}
                    <TouchableOpacity
                        style={styles.closeButtonContainer}
                        onPress={() => setVisibleModal(false)}
                    >
                        <Text style={styles.closeButton}>✕</Text>
                    </TouchableOpacity>

                    <View style={styles.topGradient} />
                </View>
            </Modal>
        </>

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
    mainImage: {
        width: "100%",
        height: 300,
        borderRadius: 20,
    },
    modalContent: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.9)", // más elegante que negro sólido
        justifyContent: "center",
        alignItems: "center",
    },
    page: {
        width: WIDTH,
        height: HEIGHT,
        justifyContent: "center",
        alignItems: "center",
    },
    fullMedia: {
        width: WIDTH,
        height: HEIGHT,
        resizeMode: "contain",
    },
    closeButtonContainer: {
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 10,
    },
    closeButton: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold"
    },

    topGradient: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 140,
        backgroundColor: "rgba(0,0,0,0.4)",
    },

    botonUnico: {
        backgroundColor: "rgba(255, 255, 255, 0.20)",
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.20,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
    },
    botonesFila: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        marginVertical: 10,
    },
    botonDelicado: {
        backgroundColor: "rgba(255, 255, 255, 0.16)",
        padding: 10,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",

        // Sombras suaves premium
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 5,

        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
    },
    bloqueoPremium: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderRadius: 10,
}

});

