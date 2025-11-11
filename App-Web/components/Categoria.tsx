import { ThemedView } from "./themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme.web"
import { Colors } from "@/constants/theme";
import { ThemedText } from "./themed-text";
import { StyleSheet } from "react-native";

export default function({icono, title}:{icono:any, title:string}){
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    return(
        <ThemedView style={estilo.contenedor}>
            <ThemedView style={[estilo.circulo, {backgroundColor:colors.secondary}]} >
                <Ionicons name={icono} size={20} color={colors.background} style={estilo.icono} />
            </ThemedView>
            <ThemedText style={estilo.titulo}>
                {title}
            </ThemedText>
        </ThemedView>
    )

}

const estilo= StyleSheet.create({
    contenedor: {
    alignItems: 'center', // centra círculo y texto
    justifyContent: 'center',
    marginHorizontal: 12,
    

  },
  circulo: {
    width: 60,
    height: 60,
    borderRadius: 30,      // mitad del ancho = círculo perfecto
    alignItems: 'center',  // centra el icono horizontalmente
    justifyContent: 'center', // centra el icono verticalmente
    
    marginBottom: 6,       // espacio entre círculo y texto
    shadowColor: '#000',
    elevation: 8,
    shadowRadius: 16
  },
  titulo: {
    fontSize: 14,
    textAlign: 'center',
    
  },

  icono:{
    color: 'white'
  }
})