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
import { API_URL } from "../src/config/config"
import BuscadorBoton from "@/components/BuscarBoton";
import { useComentario } from "@/hooks/use-comentario";



type MediaItem = {
    type: "image" | "video";
    uri: string;
};

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;


export default function DetalleColeccion() {

    type Comentario = {
        usuario: string;
        texto: string;
    };
    const [cargando, setCargando] = useState(false);
    const [modalVisible, setVisibleModal] = useState(false);
    const [comentarios, setComentarios] = useState<Comentario[]>([]);
    const { id, premiun } = useLocalSearchParams();
    const { coleccion, loading } = useDetalleColeccion(id);
    const user = useAuthUser();
    const { isLiked, like } = useLike(user, id);
    const { reading, leer, detener } = useSpeech();
    const {comentario} = useComentario(user, id);
    //console.log("es premiunn:", premiun);

    const renderCaracteristicaTags = () => {
        // Si está cargando, mostramos el indicador
        if (cargando) {
            return <ActivityIndicator size="large" color="#545467ff" />;
        }

        if (!coleccion?.caracteristica) {
            return <ThemedText style={styles.texto} >No se encontraron características.</ThemedText>;
        }

        const caracteristicasArray = Array.isArray(coleccion.caracteristica)
            ? coleccion.caracteristica
            : coleccion.caracteristica.split(',');

        return caracteristicasArray.map((c, index) => (
            <View style={styles.cajita} key={index} >
                <Text style={styles.texto} >{c.trim()}</Text>
            </View>
        ));
    };

    const Media: MediaItem[] = [{ type: "image", uri: `${API_URL}/uploads/${coleccion?.nombre_archivo}` }, { type: "video", uri: `${API_URL}/uploads/video1.mp4` }]

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
                    source={{ uri: `${API_URL}/uploads/${coleccion?.nombre_archivo}` }}
                    style={styles.background}
                    blurRadius={10}
                >
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.03)', 'rgba(0, 0, 0, 0)']}
                        style={StyleSheet.absoluteFillObject}
                    />
                    <Header
                        title="Detalle de la colección"
                    />

                    <BlurView intensity={50} style={styles.blurOverlay}>
                        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 60 }}>
                            <TouchableOpacity
                                onPress={() => setVisibleModal(true)}
                                style={{ width: "100%", alignItems: "center" }}
                            >
                                <Image
                                    style={styles.imagen}
                                    source={{ uri: `${API_URL}/uploads/${coleccion?.nombre_archivo}` }}
                                />

                            </TouchableOpacity>

                            <ThemedText style={styles.titulo}>{coleccion?.titulo}</ThemedText>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={true}
                                contentContainerStyle={styles.sliderContainer}
                            >
                                <ThemedView style={styles.infoCard}>
                                    <ScrollView style={{ backgroundColor: '0000' }}>
                                        <ThemedText style={styles.subtitle}>Descripción:</ThemedText>
                                        <ThemedText type="defaultSemiBold" style={styles.texto}>
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
                                        <ThemedText type="defaultSemiBold" style={styles.texto}>
                                            Autor: {coleccion?.autor}{'\n'}
                                            Fecha: {coleccion?.fecha}{'\n'}
                                            Tipo: {coleccion?.categoria}{'\n'}
                                        </ThemedText>
                                    </ScrollView>

                                </ThemedView>

                            </ScrollView>
                            <View style={styles.botonesFila}>

                                <TouchableOpacity onPress={() => like()} style={styles.botonDelicado}
                                >
                                    <Ionicons
                                        name={isLiked && user ? "heart" : "heart-outline"}
                                        size={24}
                                        color={isLiked && user ? "red" : "#fff"}
                                    />
                                </TouchableOpacity>


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
                                        <Text style={[styles.sincomentario, { color: '#ccc' }]}>Aún no hay comentarios.</Text>
                                    )}
                                    
                                    <TouchableOpacity onPress={() => comentario()}>
                                        <ThemedView style={[styles.inputSimulado]}>

                                            <ThemedText style={styles.placeholder}>Escribe un comentario...</ThemedText>
                                        </ThemedView>
                                    </TouchableOpacity>
                                    
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
                    <FlatList
                        data={Media}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        renderItem={renderMedia}
                    />


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
    sincomentario:{
        marginTop:8,
        marginHorizontal: 70,
    },
    inputSimulado: {
        height: 50,
        width: 318,
        borderRadius: 32,
        //paddingHorizontal: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',      // centra verticalmente
        flexDirection: 'row',      // pone icono y texto en línea
        
        marginTop: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.15)', // efecto vidrio
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        shadowColor: '#6a6a6aff',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 8,

    },
    placeholder: {
        color: '#e4e4e3ff',
        marginLeft: 16,
        fontSize: 14,
    },
    icono: {
        marginLeft: 16,
        color: '#706c65ff',
    },
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
    texto: {
        color: '#fff'
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
    cajita: {
        backgroundColor: '#ff6f001d',
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#fcb37cff'

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
        marginTop: 32,
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

