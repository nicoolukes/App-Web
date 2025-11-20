import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useRef } from "react";
import React from 'react';
import { Animated, Dimensions, } from 'react-native';
import { useContext } from "react";
import { UsuarioContext } from "../../context/premiunContext";
import CModal from '@/components/CModel';
import { useUsuario } from "../../hooks/use-usuario"
import ConfigModal from "@/components/configModal";


export default function Usuario() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const { usuario, esPremiun, cargarUsuario } = useContext(UsuarioContext) ?? { usuario: null, esPremium: false };
    const { user, cerrarSesion, activarBiometria, desactivarPremiun } = useUsuario({ usuario, esPremiun, cargarUsuario });
    const screenAlto = Dimensions.get('window').height;
    const moverEnY = useRef(new Animated.Value(screenAlto)).current;

    const abrirSheet = () => {
        Animated.timing(moverEnY, {
            toValue: screenAlto * 0.0,
            duration: 300,
            useNativeDriver: true
        }).start();
    };

    const cerrarSheet = () => {
        Animated.timing(moverEnY, {
            toValue: screenAlto,
            duration: 300,
            useNativeDriver: true
        }).start();
    };

    return (
        <>
            <ThemedView style={estilo.p}>
                <ThemedView style={estilo.header}>

                    <ThemedView style={estilo.sesion}>

                        {user ? (
                            <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ThemedView style={[estilo.circulo, { borderColor: colors.primary }]}>
                                    <Ionicons name="person-circle-sharp" size={24} color={colors.icon} />
                                </ThemedView>
                                <TouchableOpacity onPress={() => router.push({
                                    pathname: "/",
                                })}>
                                    <ThemedText style={estilo.texto}>{usuario?.nombre}</ThemedText>
                                </TouchableOpacity>
                            </ThemedView>
                        ) : (

                            <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ThemedView style={[estilo.circulo, { borderColor: colors.primary }]}>
                                    <Ionicons name="person-circle-sharp" size={24} color={colors.icon} />
                                </ThemedView>
                                <TouchableOpacity onPress={() => router.push({
                                    pathname: "/Login",
                                })}>
                                    <ThemedText style={estilo.texto}>Iniciar sesión</ThemedText>
                                </TouchableOpacity>
                            </ThemedView>
                        )}

                    </ThemedView>

                    <ThemedView style={estilo.opciones}>

                        {esPremiun && user ? (
                            <TouchableOpacity >
                                <ThemedView style={[estilo.circuloRelleno, { backgroundColor: colors.primary }]} >
                                    <MaterialCommunityIcons name="diamond" size={24} color={colors.icon} />
                                </ThemedView>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <ThemedView style={[estilo.circulo, { borderColor: colors.primary }]} >
                                    <MaterialCommunityIcons name="diamond" size={24} color={colors.icon} />
                                </ThemedView>
                            </TouchableOpacity>
                        )}

                        <ThemedView style={[estilo.circulo, { borderColor: colors.primary }]}>
                            <Ionicons name="share-social-sharp" size={24} color={colors.icon} />
                        </ThemedView>
                        <TouchableOpacity onPress={abrirSheet}>
                            <ThemedView style={[estilo.circulo, { borderColor: colors.primary }]}>
                                <Ionicons name="settings-sharp" size={24} color={colors.icon} />
                            </ThemedView>
                        </TouchableOpacity>


                    </ThemedView>

                </ThemedView>
                <ThemedView style={[estilo.h, { backgroundColor: colors.superficie }]}>
                    <ThemedText></ThemedText>
                </ThemedView>

                <ConfigModal medida={moverEnY} user={user} cerrarSesion={cerrarSesion} activarBiometria={() => activarBiometria(user)} desactivarPremiun={desactivarPremiun} closeSheet={cerrarSheet} />

            </ThemedView>
            <CModal
                visible={modalVisible}
                cerrarModal={() => setModalVisible(false)}
            />
        </>
    )
}

const estilo = StyleSheet.create({
    p: {
        flex: 1,
        paddingTop: 32,
        //marginTop: 32

        //backgroundColor: '#D18A54',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 8,
        marginTop: 16,
        marginBottom: 40
    },

    sesion: {
        flexDirection: 'row',
        alignItems: 'center',

    },

    opciones: {
        flexDirection: 'row',
    },

    texto: {
        textDecorationLine: 'underline',
        textDecorationColor: 'white'
    },

    circulo: {
        borderWidth: 1.25,
        marginHorizontal: 8,
        padding: 8,
        borderRadius: 1000,
        shadowColor: '#000000ff',
        elevation: 24

    },
    circuloRelleno: {
        marginHorizontal: 8,
        padding: 8,
        borderRadius: 1000,
        shadowColor: '#000000ff',
        elevation: 24
    },

    h: {
        flex: 1,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        backgroundColor: '#2A2A27',
        elevation: 24,

        shadowColor: '#050505ff'
    },




})