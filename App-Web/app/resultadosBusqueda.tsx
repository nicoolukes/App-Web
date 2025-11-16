import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme.web';
import { Colors } from '@/constants/theme';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';

interface ResultadoBusqueda {
  id: number;
  titulo: string;
}

export default function BuscarScreen() {
  const [texto, setTexto] = useState('');
  const [resultados, setResultados] = useState<ResultadoBusqueda[]>([]);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const router = useRouter();


  useEffect(() => {
    const delay = setTimeout(() => {
      if (texto.trim().length > 0) {
        buscarEnApi(texto);
      } else {
        setResultados([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [texto]);

  const buscarEnApi = async (query: string) => {

    try {

      const response = await fetch(`http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/endpoints/listar_img.php?query=${query}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const datos = await response.json();

      const filtrados = datos.filter((item: any) =>
        item.titulo.toLowerCase().includes(query.toLowerCase())
      );
      setResultados(filtrados);

    } catch (error) {
      console.error('Error al buscar:', error);
      setResultados([]);
    }

  };

  const irADetalle = (item: ResultadoBusqueda) => {
    router.push({
      pathname: "/DetalleColeccion",
      params: { id: item.id }
    });
  };

  const renderItem = ({ item }: { item: ResultadoBusqueda }) => (
    <TouchableOpacity onPress={() => irADetalle(item)} style={estilo.itemContainer}>
      <ThemedText style={estilo.itemText}>{item.titulo}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={estilo.pantalla}>
      <Header title="Buscar en el museo" />

      <ThemedView style={estilo.contenido}>
        <TextInput
          autoFocus
          placeholder="Buscá en el museo..."
          placeholderTextColor="#B3ADA3"
          value={texto}
          onChangeText={setTexto}
          style={[estilo.input, { color: colors.text }]}
        />

        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={
            resultados.length === 0 ? { flex: 1 } : null
          }
          ListEmptyComponent={
            texto.trim().length > 0 && resultados.length === 0 ? (
              <ThemedText style={estilo.emptyText}>
                No se encontraron resultados.
              </ThemedText>
            ) : null
          }
        />
      </ThemedView>
    </ThemedView>
  );
}

const estilo = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#121212', // o el color de tu tema
  },
  contenido: {
    flex: 1,
    padding: 16,
    paddingTop: 120, 
  }, 
  input: {
    height: 56,
    borderColor: '#555',
    borderWidth: 1.5,
    borderRadius: 28,
    paddingHorizontal: 16,
    color: 'white',
    marginBottom: 16,
    backgroundColor: '#1E1E1E', // más contraste con el fondo
  },
  itemContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
  },
  emptyText: {
    marginTop: 32,
    textAlign: 'center',
    color: '#999',
  },
});