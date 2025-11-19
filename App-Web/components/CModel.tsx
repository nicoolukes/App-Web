import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Modal, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "../constants/theme";
import { useColorScheme } from "../hooks/use-color-scheme";
import { useRouter } from "expo-router";
import {useState } from "react";
import {User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import React from 'react';
import { auth } from "@/credenciales";
import { actualizarUsuario } from "@/fciones/actualizarUsuario";
import { useContext } from "react";
import { UsuarioContext } from "../app/premiunContext";

export default function CModel({ visible, cerrarModal }: { visible: boolean, cerrarModal: ()=> void}) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const router = useRouter();
    const [usuario, setUsuario] = useState<User | null>(null);
    const {cargarUsuario } = useContext(UsuarioContext) ?? { usuario: null, esPremium: false };
    

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
        });


        return unsubscribe;
    }, []);

    const hacermePremium = () => {

        if (!usuario) {
            cerrarModal && cerrarModal();
            router.push("/Login");
            return;
        }
        console.log("No entrooo");
        activarPremium();
    }

    const activarPremium = () => {
        actualizarUsuario(usuario, true);
        if(cargarUsuario){
            cargarUsuario();
        }
        
        cerrarModal && cerrarModal();
    };
    return (
        <>
            <Modal
                visible={visible}
                animationType="fade"
                transparent
                onRequestClose={cerrarModal}
            >
                <ThemedView style={estilo.modalFondo}>
                    <ThemedView style={[estilo.modalContenido, { backgroundColor: colors.superficie }]}>


                        <MaterialCommunityIcons
                            name="diamond"
                            size={42}
                            color={colors.primary}
                            style={{ marginBottom: 10 }}
                        />

                        <ThemedText style={estilo.modalTitulo}>
                            Beneficios Premium
                        </ThemedText>

                        <ThemedView style={[estilo.listaBeneficios, { backgroundColor: colors.superficie }]}>
                            <ThemedView style={[estilo.beneficio, { backgroundColor: colors.superficie }]}>
                                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                                <ThemedText style={estilo.item}>Acceso a contenidos exclusivos</ThemedText>
                            </ThemedView>

                            <ThemedView style={[estilo.beneficio, { backgroundColor: colors.superficie }]}>
                                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                                <ThemedText style={estilo.item}>“¿Sabías que…?” extendidos</ThemedText>
                            </ThemedView>

                            <ThemedView style={[estilo.beneficio, { backgroundColor: colors.superficie }]}>
                                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                                <ThemedText style={estilo.item}>Fichas con fotos y sonidos reales</ThemedText>
                            </ThemedView>

                            <ThemedView style={[estilo.beneficio, { backgroundColor: colors.superficie }]}>
                                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                                <ThemedText style={estilo.item}>Sin anuncios</ThemedText>
                            </ThemedView>

                            <ThemedView style={[estilo.beneficio, { backgroundColor: colors.superficie }]}>
                                <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                                <ThemedText style={estilo.item}>Modo explorador interactivo</ThemedText>
                            </ThemedView>
                        </ThemedView>

                        <TouchableOpacity style={[estilo.botonActivar, { backgroundColor: colors.primary }]} onPress={hacermePremium}>
                            <ThemedText style={estilo.textoActivar}>Hacerme miembro</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={cerrarModal}>
                            <ThemedText style={estilo.cancelar}>Cancelar</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                </ThemedView>
            </Modal>
            
        </>
    )
}

const estilo = StyleSheet.create({
    modalFondo: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },

    modalContenido: {
        width: '100%',
        padding: 24,
        borderRadius: 22,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 10,
    },

    modalTitulo: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
    },

    listaBeneficios: {
        width: '100%',
        marginBottom: 24,
    },

    beneficio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    item: {
        fontSize: 16,
        marginLeft: 10,
    },

    botonActivar: {
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 50,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
    },

    textoActivar: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
    },

    cancelar: {
        marginTop: 6,
        fontSize: 15,
        opacity: 0.7,
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