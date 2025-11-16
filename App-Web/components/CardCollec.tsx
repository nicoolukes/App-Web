import { TouchableOpacity, ImageBackground, StyleSheet, Dimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from './themed-text';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

export default function CardCollec({ image, title, description, id }: { image: any, title: string, description: string, id: number }) {
  const router = useRouter();
  const cardWidth = (screenWidth - 48) / 2; // dos por fila con margen

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() =>
        router.push({
          pathname: "/DetalleColeccion",
          params: { id },
        })
      }
      style={[estilos.card, { width: cardWidth, aspectRatio: 3 / 4 }]}
    >
      <ImageBackground
        source={{ uri: image }}
        style={estilos.image}
        imageStyle={estilos.imageBorder}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.65)']}
          style={estilos.overlay}
        >
          <View style={estilos.textContainer}>
            <ThemedText type="subtitle" style={estilos.text}>{title}</ThemedText>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const estilos = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#222',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 6,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageBorder: {
    borderRadius: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    padding: 10,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});