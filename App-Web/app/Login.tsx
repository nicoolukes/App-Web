import LoginForm from "@/components/LoginForm";
import appFireBase from '../credenciales';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { router, Stack } from "expo-router";
import { Colors } from "../constants/theme";
import { useColorScheme } from "../hooks/use-color-scheme";
import { Dimensions } from "react-native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import BackBoton from "@/components/BackBoton";
import * as LocalAuthentication from 'expo-local-authentication';



export default function LoginScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(true);

    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const loginCorrecto = () => {
        router.push("/");
    }

    

    return (
        <ThemedView style={estilo.padre}>
            <BackBoton />



            <ThemedView style={[estilo.contenerdorFormulario, /*{ backgroundColor: colors.superficie }*/]}>
                <ThemedView /*style={{ backgroundColor: colors.superficie }}*/ >
                    {isLogin ? (
                        <ThemedText type="title" style={estilo.titulo}>
                            Iniciar Sesión
                        </ThemedText>
                    ) : (
                        <ThemedText type="default">
                            Resgistrarse
                        </ThemedText>
                    )}
                </ThemedView>

                {isLogin ? (
                    <LoginForm onSubmit={loginCorrecto} />
                ) : (
                    <ThemedText type="title">Formulario de Registro</ThemedText>
                )
                }

                <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                    {isLogin ? (
                        <ThemedText style={estilo.opcionRegistro}>
                            ¿No tienes cuenta?
                            <ThemedText style={[estilo.link, { color: colors.acentuar }]}> Regístrate</ThemedText>
                        </ThemedText>
                    ) : (
                        <ThemedText style={estilo.opcionRegistro}>
                            ¿Ya tienes cuenta?
                            <ThemedText style={estilo.link}> Inicia Sesión</ThemedText>
                        </ThemedText>
                    )}
                </TouchableOpacity>
            </ThemedView>




        </ThemedView>

    )
}

const estilo = StyleSheet.create({
    padre: {
        flex: 1,
        //paddingTop: 80, // Espacio superior
        paddingHorizontal: 24, // Margen horizontal

        alignItems: 'center',
        justifyContent: 'center',

    },

    contenerdorFormulario: {
        width: Dimensions.get('window').width - 0,
        maxWidth: 400, // Limita el ancho en pantallas grandes
        alignSelf: 'center', // Centra el contenedor del formulario en la pantalla
        padding: 32,
        borderRadius: 24, // Bordes redondeados para el 'panel' del formulario
        /* shadowOpacity: 0.5, // Sombra sutil
         shadowRadius: 16,
         elevation: 8,*/
        margin: 0,

    },

    titulo: {
        textAlign: 'center',
        marginBottom: 30,
        fontFamily: 'MerriweatherSans_700Bold',


    },

    opcionRegistro: {
        marginTop: 16,
        fontSize: 14,
        textAlign: 'center',



    },
    link: {
        color: '#2F5D50', // verde fuerte, el mismo del botón "Iniciar Sesión"
        fontSize: 14,
        fontWeight: 'bold',

    }


})