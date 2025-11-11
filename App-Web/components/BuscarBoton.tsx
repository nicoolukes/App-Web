import { useNavigation } from "expo-router";
import { ThemedView } from "./themed-view";
import { ThemedText} from "./themed-text";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Colors } from "@/constants/theme";


export default function BuscadorBoton() {
    const navigation = useNavigation();
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity onPress={() => (navigation as any).navigate('resultadosBusqueda')}>
      <ThemedView lightColor={colors.superficie} darkColor={colors.superficie} style={[estilo.inputSimulado, {borderColor:colors.superficie}]}>
        <Ionicons name= "search" size={20}  style={estilo.icono} />
        <ThemedText style={estilo.placeholder}>Buscá especies, piezas...</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const estilo = StyleSheet.create({
  inputSimulado: {
    height: 50,
    borderWidth: 1.5,
    borderRadius: 32,
    paddingHorizontal: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',      // centra verticalmente
    flexDirection: 'row',      // pone icono y texto en línea
    marginHorizontal: 16,

  },
  placeholder: {
    color: '#706c65ff',
    marginLeft: 8,
    fontSize:14,
  },
  icono:{
    marginLeft: 16,
    color: '#706c65ff',
  }
});