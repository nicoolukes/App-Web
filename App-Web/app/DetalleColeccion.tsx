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
                source={{ uri: `http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/${coleccion?.nombre_archivo}` }}
                style={styles.background}
                blurRadius={10} // si no usás expo-blur
            >
                <LinearGradient
                    colors={['rgba(0, 0, 0, 0.03)', 'rgba(0, 0, 0, 0)']}
                    style={StyleSheet.absoluteFillObject}
                />
                <Header />

                <BlurView intensity={50} style={styles.blurOverlay}>
                    {/* Imagen y título fijos */}

                    <Image
                        style={styles.imagen}
                        source={{ uri: `http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/${coleccion?.nombre_archivo}` }}
                    />
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
                </BlurView>
            </ImageBackground>
        </ThemedView>


    );
}


const styles = StyleSheet.create({
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