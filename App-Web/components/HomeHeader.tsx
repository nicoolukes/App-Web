import { TouchableOpacity } from "react-native";
import { ThemedView } from "./themed-view";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "./themed-text";
import { StyleSheet } from "react-native";
import { Platform, StatusBar } from "react-native";
import { Colors } from "../constants/theme";
import { useColorScheme } from "../hooks/use-color-scheme";
import { useRouter } from 'expo-router';
import { ComponentProps } from "react";



export default function HomeHeader({ titulo}: { titulo: string}) {
    const colorScheme = useColorScheme();
    const volver = useRouter();
    const colors = Colors[colorScheme ?? 'light'];
    return (
        <ThemedView style={estilo.contenedor}>
            
            <ThemedText type="defaultSemiBold" style={estilo.title}>
                {titulo}
            </ThemedText>

            
        </ThemedView>
    )
}

const estilo= StyleSheet.create({
    contenedor:{
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
        height: 60 + (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0),
        //paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute', // mantiene fijo arriba
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100, // asegura que quede encima
        shadowColor: '#000',
        elevation: 8
       
    },

    title:{
        marginLeft:16
    }
})