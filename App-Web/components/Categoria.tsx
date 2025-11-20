import { ThemedView } from "./themed-view";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme.web"
import { Colors } from "@/constants/theme";
import { ThemedText } from "./themed-text";
import { StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import ColeccionScreen from "@/app/colecciones";

export default function ({ icono, title, categoria }: { icono: any, title: string, categoria: string }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();

  

  return (
    <TouchableOpacity onPress={() => {
      router.push({
        pathname: "/colecciones",
        params: { categoria: categoria }
      })
    }}>
    <ThemedView style={estilo.contenedor}>

      <ThemedView  style={[estilo.circulo, { backgroundColor: colors.secondary }]} >
        <Image
          source={{ uri: icono }}
          style={{ width: 30, height: 30, tintColor: 'white' }}
          resizeMode="contain"
        />
      </ThemedView>
      <ThemedText style={estilo.titulo} numberOfLines={2} ellipsizeMode="tail">
        {title}
      </ThemedText>

    </ThemedView>
    </TouchableOpacity>
  )

}

const estilo = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: 12,
    width: 80,
    height: 100, // altura fija para todos 


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
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 70,
    lineHeight: 15,

  },

  icono: {
    color: 'white'
  }
})