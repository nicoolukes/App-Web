import { ImageBackground } from "expo-image";
import { ThemedView } from "./themed-view";
import LoginScreen from "@/app/Login";
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from "./themed-text";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { useRouter } from "expo-router";
import DetalleColeccion from "@/app/DetalleColeccion";

const { width: screenWidth } = Dimensions.get('window');
export default function Card({ image, title, description, width = 0.9, aspectRatio = 16 / 9, id }: { image: any, title: string, description: string, width: number, aspectRatio: number, id: number }) {
    const router = useRouter();
    const cardWidth = screenWidth * width;
    return (
        <TouchableOpacity  onPress={() => router.push({
            pathname: "/DetalleColeccion",
            params: { id: id} // 👈 enviamos el título como parámetro
            })} style={[estilo.card, { width: cardWidth, aspectRatio }] }>
            
                <ImageBackground
                    source={image}
                    style={estilo.image}
                    imageStyle={estilo.imageBorder}>


                    <LinearGradient
                        colors={['transparent', 'rgba(0, 0, 0, 0.79)']}
                        style={estilo.overlay}
                    >
                        <ThemedText type="subtitle" style={estilo.text}>{title}</ThemedText>
                        <ThemedText type="secondaryText" style={estilo.texto}>{description}</ThemedText>
                    </LinearGradient>


                </ImageBackground>
            

        </TouchableOpacity>
    )
}

const estilo = StyleSheet.create({
    card: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000000ff',
        elevation: 6,
        shadowOpacity: 0,
        shadowRadius: 16,
        marginVertical: 16,

    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#000000ff'
    },
    imageBorder: {
        borderRadius: 16,
    },
    overlay: {
        padding: 12,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,


    },

    text: {
        color: '#EAE6E0',
        marginLeft: 4
    },

    texto:{
        marginLeft: 4
    }

})