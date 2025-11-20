import { ThemedView } from "./themed-view"
import { ThemedText } from "./themed-text"
import { View, Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Animated } from "react-native"
import { StyleSheet } from "react-native"
import { Colors } from "../constants/theme";
import { useColorScheme } from "../hooks/use-color-scheme";


export default function ConfigModal({medida, user, desactivarPremiun, activarBiometria, cerrarSesion, closeSheet}:{medida: any, user:any, desactivarPremiun: ()=> void, activarBiometria: ()=> void, cerrarSesion: ()=> void, closeSheet:()=>void}){
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    return(
        
         <Animated.View
                    style={[estilo.sheet,{ transform: [{ translateY: medida },]}, {backgroundColor: colors.background}]}
                >
                    <ThemedView>
                    <ThemedView style={estilo.handle} />

                    <ThemedText style={estilo.sheetTitle}>Configuración</ThemedText>

                    <ThemedView style={estilo.settingsGroup}>
                        <TouchableOpacity style={[estilo.settingsItem, {borderBottomColor: colors.bordes}]}>
                            <Ionicons name="person-outline" size={22} color={colors.icon} />
                            <ThemedText style={estilo.settingsText}>Cuenta</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[estilo.settingsItem, {borderBottomColor: colors.bordes}]} onPress={ desactivarPremiun}>
                            <MaterialCommunityIcons name="diamond" size={24} color={colors.icon} />
                            <ThemedText style={estilo.settingsText}>Dejar de ser Miembro</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[estilo.settingsItem, {borderBottomColor: colors.bordes}]}>
                            <Ionicons name="notifications-outline" size={22} color={colors.icon} />
                            <ThemedText style={estilo.settingsText}>Notificaciones</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[estilo.settingsItem, {borderBottomColor: colors.bordes}]}>
                            <Ionicons name="shield-checkmark-outline" size={22} color={colors.icon} />
                            <ThemedText style={estilo.settingsText}>Privacidad</ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity style={[estilo.settingsItem, {borderBottomColor: colors.bordes}]} onPress={activarBiometria}>
                            <Ionicons name="shield-checkmark-outline" size={22} color={colors.icon} />
                            <ThemedText style={estilo.settingsText}>Activar igreso por Biometria</ThemedText>
                        </TouchableOpacity>

                        {user ? (
                            <TouchableOpacity style={[estilo.settingsItem, {borderBottomColor: colors.bordes}]} onPress={cerrarSesion}>
                                <Ionicons name="exit-outline" size={22} color={colors.icon} />
                                <ThemedText style={estilo.settingsText}>Cerrar Sesion</ThemedText>
                            </TouchableOpacity>

                        ) : ( 
                            <View></View>
                        )}

                    </ThemedView>


                    <TouchableOpacity onPress={closeSheet} style={[estilo.closeButton, { backgroundColor: colors.secondary }]}>
                        <Text style={estilo.closeText}>Cerrar</Text>
                    </TouchableOpacity>

                </ThemedView>
                </Animated.View>
               
    )

    
}

const estilo = StyleSheet.create({
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
        
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center'
    },

    settingsGroup: {
        //backgroundColor: '#2E2E2E',
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
        //color: '#fff'
    },

    closeButton: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center'
    },

    closeText: {
        fontSize: 17,
        fontWeight: '600',
        color:"white"
    }

})