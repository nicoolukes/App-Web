import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from "../hooks/use-color-scheme";
import { Colors } from "../constants/theme";

export default function BackBoton(){
    const volver = useRouter();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return(
        <TouchableOpacity onPress={()=> volver.back()} style={[estilo.boton, { backgroundColor: colors.primary }]}>

            <Ionicons name="arrow-back" size={24} color="white"/>
        </TouchableOpacity>
    )
}

const estilo= StyleSheet.create({
    boton:{
        position: 'absolute',
        top: 44,
        left: 24,
        backgroundColor: '#3E7C6A',
        borderRadius: 24,
        padding: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    }
})