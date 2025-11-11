import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme} from '@/hooks/use-color-scheme.web';
import { Colors } from '@/constants/theme';

interface ResultadoBusqueda {
  id: number;
  nombre: string;
}

export default function BuscarScreen() {
  const [texto, setTexto] = useState('');
  const [resultados, setResultados] = useState<ResultadoBusqueda[]>([]);
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  

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

  const buscarEnApi = (query: string) => {
    const todos = [
      { id: 1, nombre: 'Colección de arte' },
      { id: 2, nombre: 'Historia natural' },
      { id: 3, nombre: 'Fotografía antigua' },
      { id: 4, nombre: 'Esculturas' },
      { id: 5, nombre: 'Pinturas rupestres' },
    ];
     /*try{
           
            const resultado = await fetch(`https://tu-api.com/buscar?query=${query}`);
            const datos = await resultado.json();

            navegar.navidate('ResultadoBusqueda', {resultados: datos, query})
            
        }catch (error){
            console.error('Error al buscar', error)
        }*/

    const filtrados = todos.filter((item) =>
      item.nombre.toLowerCase().includes(query.toLowerCase())
    );

    setResultados(filtrados);
  };

  const irADetalle = (item: ResultadoBusqueda) => {
    (navigation as any).navigate('Colecciones', { objeto: item });
  };

  const renderItem = ({ item }: { item: ResultadoBusqueda }) => (
    <TouchableOpacity onPress={() => irADetalle(item)} style={estilo.itemContainer}>
      <ThemedText style={estilo.itemText}>{item.nombre}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={estilo.container}>
      <TextInput
        autoFocus
        placeholder="Buscá en el museo..."
        placeholderTextColor="#B3ADA3"
        value={texto}
        onChangeText={setTexto}
        style={[estilo.input, {color:colors.text}]}
        
      />

      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          texto.trim().length > 0 && resultados.length === 0 ? (
            <ThemedText style={estilo.emptyText}>No se encontraron resultados.</ThemedText>
          ) : null
        }
      />
    </ThemedView>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 56,
    borderColor: 'gray',
    borderWidth: 1.5,
    borderRadius: 32,
    paddingHorizontal: 16,
    color: 'white',
    marginBottom: 16,
  },
  itemContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    
  },
  itemText: {
    fontSize: 16,
  },
  emptyText: {
    marginTop: 32,
    textAlign: 'center',
    color: '#999',
  },
});