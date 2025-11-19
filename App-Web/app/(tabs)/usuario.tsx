import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { router, useRouter } from "expo-router";
import { useState } from "react";
import { getAuth, User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRef } from "react";
import React from 'react';
import { Animated, Dimensions, } from 'react-native';
import { auth } from "@/credenciales";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { UsuarioContext } from "../premiunContext";
import CModal from '@/components/CModel';
import { actualizarUsuario } from "@/fciones/actualizarUsuario";
import {useUsuario} from "../../hooks/use-usuario"
import ConfigModal from "@/components/configModal";


export default function Usuario() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisiblePre, setModalVisiblePre] = useState(false);
   // const [user, setUsuario] = useState<User | null>(null);
    const { usuario, esPremiun, cargarUsuario } = useContext(UsuarioContext) ?? { usuario: null, esPremium: false };
    const { user, cerrarSesion, activarBiometria, desactivarPremiun } = useUsuario({ usuario, esPremiun, cargarUsuario });
    const screenHeight = Dimensions.get('window').height;
    const translateY = useRef(new Animated.Value(screenHeight)).current;

    const openSheet = () => {
        Animated.timing(translateY, {
            toValue: screenHeight * 0.0, // sube hasta 60% de pantalla (40% visible abajo)
            duration: 300,
            useNativeDriver: true
        }).start();
    };

    const closeSheet = () => {
        Animated.timing(translateY, {
            toValue: screenHeight, // vuelve a bajar
            duration: 300,
            useNativeDriver: true
        }).start();
    };

   /* useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
        });


        return unsubscribe;
    }, []);*/


    /*useEffect(() => {
        if (!esPremiun || !usuario?.uid) return;

        const actPremium = async () => {
            try {
                const response = await fetch("http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/endpoints/actualizarUsuario.php?", {
                    method: "POST",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({
                        uidd: usuario?.uid,
                        premiun: "1"
                    }).toString(),
                });

                const data = await response.json();
                console.log('Usuario actualizado a premiun:', data);
            } catch (error) {
                console.error('Error al actualizar usuario:', error);
            }
        };

        actPremium();
    }, [esPremiun, usuario]);*/

   /* const cerrarSesion = async () => {
        try {
            await signOut(auth);
            setUsuario(null);
            alert("Sesión cerrada correctamente");
        } catch (error) {
            console.log("Error al cerrar sesión:", error);
        }
    };

    const desactivarPremiun = async () => {
        if (esPremiun) {
            await actualizarUsuario(user, false);
            if (cargarUsuario) {
                await cargarUsuario();
            }

        } else {
            alert("No eres premiun")
        }
    }
    const activarBiometria = async () => {
        if (!user?.uid) {
            alert("Debes iniciar sesión para activar la biometría");
            return;
        }
        if (await AsyncStorage.getItem("biometria_activada") === "true") {
            await AsyncStorage.setItem("biometria_activada", "false");
            alert("Biometría desactivada");
        } else {
            await AsyncStorage.setItem("biometria_activada", "true");

            alert("Biometría activada");
        }
    };*/


    return (
        <>

            <ThemedView style={estilo.p}>
                <ThemedView style={estilo.header}>

                    <ThemedView style={estilo.sesion}>

                        {user ? (
                            <ThemedView style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <ThemedView style={[estilo.circulo, { borderColor: colors.primary }]}>
                                    <Ionicons name="person-circle-sharp" size={24} color={colors.icon} style={estilo.icon} />
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
                                    <Ionicons name="person-circle-sharp" size={24} color={colors.icon} style={estilo.icon} />
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
                            <TouchableOpacity onPress={() => setModalVisiblePre(true)}>
                                <ThemedView style={[estilo.circuloRelleno, { backgroundColor: colors.primary }]} >
                                    <MaterialCommunityIcons name="diamond" size={24} color={colors.icon} style={estilo.icon} />
                                </ThemedView>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <ThemedView style={[estilo.circulo, { borderColor: colors.primary }]} >
                                    <MaterialCommunityIcons name="diamond" size={24} color={colors.icon} style={estilo.icon} />
                                </ThemedView>
                            </TouchableOpacity>
                        )}

                        <ThemedView style={[estilo.circulo, { borderColor: colors.primary }]}>
                            <Ionicons name="share-social-sharp" size={24} color={colors.icon} style={estilo.icon} />
                        </ThemedView>
                        <TouchableOpacity onPress={openSheet}>
                            <ThemedView style={[estilo.circulo, { borderColor: colors.primary }]}>
                                <Ionicons name="settings-sharp" size={24} color={colors.icon} style={estilo.icon} />
                            </ThemedView>
                        </TouchableOpacity>


                    </ThemedView>

                </ThemedView>
                <ThemedView style={[estilo.h, { backgroundColor: colors.superficie }]}>

                </ThemedView>

                <ConfigModal medida= {translateY} user={user} cerrarSesion={cerrarSesion} activarBiometria={()=>activarBiometria} desactivarPremiun={desactivarPremiun} closeSheet={closeSheet} />
                {/*<Animated.View
                    style={[
                        estilo.sheet,
                        { transform: [{ translateY }] }
                    ]}
                >
                    <ThemedView style={estilo.handle} />

                    <ThemedText style={estilo.sheetTitle}>Configuración</ThemedText>

                    <ThemedView style={estilo.settingsGroup}>
                        <TouchableOpacity style={estilo.settingsItem}>
                            <Ionicons name="person-outline" size={22} color={colors.icon} />
                            <ThemedText style={estilo.settingsText}>Cuenta</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilo.settingsItem} onPress={ desactivarPremiun}>
                            <MaterialCommunityIcons name="diamond" size={24} color={colors.icon} style={estilo.icon} />
                            <ThemedText style={estilo.settingsText}>Dejar de ser Miembro</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilo.settingsItem}>
                            <Ionicons name="notifications-outline" size={22} color={colors.icon} />
                            <ThemedText style={estilo.settingsText}>Notificaciones</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilo.settingsItem}>
                            <Ionicons name="shield-checkmark-outline" size={22} color={colors.icon} />
                            <ThemedText style={estilo.settingsText}>Privacidad</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={estilo.settingsItem} onPress={activarBiometria}>
                            <Ionicons name="shield-checkmark-outline" size={22} color={colors.icon} />
                            <ThemedText style={estilo.settingsText}>Activar igreso por Biometria</ThemedText>
                        </TouchableOpacity>

                        {user ? (
                            <TouchableOpacity style={estilo.settingsItem} onPress={cerrarSesion}>
                                <Ionicons name="exit-outline" size={22} color={colors.icon} />
                                <ThemedText style={estilo.settingsText}>Cerrar Sesion</ThemedText>
                            </TouchableOpacity>

                        ) : ( 
                            <View></View>
                        )}

                    </ThemedView>


                    <TouchableOpacity onPress={closeSheet} style={[estilo.closeButton, { backgroundColor: colors.secondary }]}>
                        <ThemedText style={estilo.closeText}>Cerrar</ThemedText>
                    </TouchableOpacity>


                </Animated.View>*/}


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

    icon: {

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
    sheet: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: '100%',             // altura del cajón
        bottom: 0,
        backgroundColor: '#222',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingHorizontal: 20
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: '#555',
        borderRadius: 20,
        alignSelf: 'center',
        marginBottom: 10
    },


    sheetTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center'
    },

    settingsGroup: {
        backgroundColor: '#2E2E2E',
        borderRadius: 18,
        paddingVertical: 6,
        overflow: 'hidden',
        marginBottom: 20,
        elevation: 4
    },

    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#3A3A3A'
    },

    settingsText: {
        fontSize: 17,
        marginLeft: 14,
        color: '#fff'
    },

    closeButton: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center'
    },

    closeText: {
        fontSize: 17,
        fontWeight: '600'
    }



})