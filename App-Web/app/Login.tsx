import LoginForm from "@/components/LoginForm";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { router } from "expo-router";
import { Colors } from "../constants/theme";
import { useColorScheme } from "../hooks/use-color-scheme";
import { Dimensions } from "react-native";
import { TouchableOpacity, StyleSheet } from "react-native";
import BackBoton from "@/components/BackBoton";
import { useAuthUser } from "../hooks/use-auth";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function LoginScreen() {
    const [isLogin, setIsLogin] = useState(true);
    const user = useAuthUser();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const loginCorrecto = async() => {
        router.push("/");
        await AsyncStorage.setItem("logueo", "true")
    }

    return (
        <ThemedView style={estilo.padre}>
            {!user?(
                <BackBoton />
            ):(
                null
            )}
            



            <ThemedView style={[estilo.contenerdorFormulario, ]}>
                <ThemedView  >
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
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',

    },

    contenerdorFormulario: {
        width: Dimensions.get('window').width - 0,
        maxWidth: 400, 
        alignSelf: 'center', 
        padding: 32,
        borderRadius: 24, 
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
        color: '#2F5D50', 
        fontSize: 14,
        fontWeight: 'bold',

    }
})