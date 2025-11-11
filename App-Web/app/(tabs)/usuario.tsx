import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";

export default function Usuario() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    return (
        <ThemedView style={estilo.p}>
            <ThemedView style={estilo.header}>

                <ThemedView style={estilo.sesion}>
                    <ThemedView style={[estilo.circulo, {borderColor:colors.primary}]}>
                        <Ionicons name="person-circle-sharp" size={24} color={colors.icon} style={estilo.icon} />
                    </ThemedView>
                    <ThemedText style={estilo.texto}>
                        Iniciar Sesión
                    </ThemedText>
                </ThemedView>

                <ThemedView style={estilo.opciones}>
                    <ThemedView style={[estilo.circulo, {borderColor:colors.primary }]} >
                        <MaterialCommunityIcons name="diamond" size={24} color={colors.icon} style={estilo.icon}/>
                    </ThemedView>
                    <ThemedView style={[estilo.circulo, {borderColor:colors.primary}]}>
                        <Ionicons name="share-social-sharp" size={24} color={colors.icon} style={estilo.icon}/>
                    </ThemedView>
                    <ThemedView style={[estilo.circulo, {borderColor:colors.primary}]}>
                        <Ionicons name="settings-sharp" size={24} color={colors.icon} style={estilo.icon} />
                    </ThemedView>
                </ThemedView>

            </ThemedView>
            <ThemedView style={[estilo.h, {backgroundColor: colors.superficie}]}>

            </ThemedView>
        </ThemedView>
    )
}

const estilo = StyleSheet.create({
    p: {
        flex: 1,
        paddingTop:32,
        //marginTop: 32

        //backgroundColor: '#D18A54',
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:8,
        marginTop: 16,
        marginBottom: 40
    },

    sesion: {
        flexDirection: 'row',
        alignItems: 'center',
        
    },

    opciones:{
        flexDirection: 'row',
    },

    icon:{
        
    },

    texto:{
        textDecorationLine: 'underline',
        textDecorationColor: 'white'
    },

    circulo:{
        borderWidth:1.25,
        marginHorizontal:8,
        padding:8,
        borderRadius: 1000,
        shadowColor: '#000000ff',
        elevation:24

    },

    h: {
        flex: 1,
        borderTopRightRadius: 32,
        borderTopLeftRadius: 32,
        backgroundColor: '#2A2A27',
        elevation: 24,

        shadowColor: '#050505ff'
    }
})