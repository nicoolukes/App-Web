import { Image } from 'expo-image';
import { Platform, StyleSheet, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import HomeHeader from '@/components/HomeHeader';
import { useState } from 'react';
import Card from '@/components/Card';

import LoginForm from '@/components/LoginForm';
import LoginScreen from '../Login';
import { StatusBar } from 'react-native';
import BuscarBoton from '@/components/BuscarBoton';
import Categoria from '@/components/Categoria';

const Stack = createNativeStackNavigator();

export default function Index() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
 
  return (
    
    

    <ThemedView style={estilo.padre}>
      <HomeHeader abrirMenu={() => setMenuVisible} abrirBuscador={() => setSearchVisible} titulo="Explorá las maravillas del museo" icon="arrow-back" />

      <ScrollView>
        <ThemedView style={estilo.body}>

          <ThemedView style={estilo.buscador}>
            <BuscarBoton />
          </ThemedView>

          <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 8, // espacio lateral
              gap: 8, // separa las tarjetas 
              marginBottom:24
            }}>
            <Categoria
              icono="search"
              title='Fosiles'
            />
            <Categoria
              icono="search"
              title='Mamiferos'
            />
            <Categoria
              icono="search"
              title='Aves'
            />
            <Categoria
              icono="search"
              title='herramientas'
            />
            <Categoria
              icono="search"
              title='Buscar'
            />

          </ScrollView>

          <ThemedView style={estilo.containerCarrusel}>
            <ThemedView style={estilo.carrusel}>
              <ThemedText type="title" style={estilo.text}>Destacado</ThemedText>
              <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 24, // espacio lateral
                  gap: 16, // separa las tarjetas 
                }}>
                <Card
                  image={{ uri: 'http://192.168.1.185/App/App-Web/API_Proyecto/uploads/img1(dino).jpg' }}
                  title="Zorro Rojo"
                  description="Zorro Rojo"
                  width={0.6}
                  aspectRatio={2 / 3}
                  id = {1}
                />
                <Card
                  image={{ uri: 'http://192.168.1.185/App/App-Web/API_Proyecto/uploads/img2(mano).jpg' }}
                  title="Ñandu Pampeano"
                  description="Ñandu Pampeano"
                  width={0.6}
                  aspectRatio={2 / 3}
                  id  = {2}
                />
                <Card
                  image={{ uri: 'http://192.168.1.185/App/App-Web/API_Proyecto/uploads/img3(dino).jpg' }}
                  title="La mejor fauna"
                  description="La mejor fauna"
                  width={0.6}
                  aspectRatio={2 / 3}
                  id  = {3}
                />
                <Card
                  image={{ uri: 'http://192.168.1.185/App/App-Web/API_Proyecto/uploads/img4(piedra).jpg' }}
                  title="Fauna"
                  description="La mejor fauna"
                  width={0.6}
                  aspectRatio={2 / 3}
                  id = {4}
                />
              </ScrollView>

            </ThemedView>

            <ThemedView style={estilo.carrusel}>
              <ThemedText type="subtitle" style={estilo.text}>Colecciones</ThemedText>
              <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 24, // espacio lateral
                  gap: 16, // separa las tarjetas 
                }}>
                <Card
                  image={{ uri: 'https://i.pinimg.com/736x/75/73/78/7573783da70edef3fa15c8b746115abd.jpg' }}
                  title="Fauna"
                  description="La mejor fauna"
                  width={0.5}
                  aspectRatio={1}
                  id = {10}
                />
                <Card
                  image={{ uri: 'https://i.pinimg.com/1200x/7b/6d/ba/7b6dba82ccba3ba322d1120a8e0177a2.jpg' }}
                  title="Flora"
                  description="La mejor fauna"
                  width={0.5}
                  aspectRatio={1}
                  id = { 11}

                />
                <Card
                  image={{ uri: 'https://i.pinimg.com/736x/75/73/78/7573783da70edef3fa15c8b746115abd.jpg' }}
                  title="Fauna"
                  description="La mejor fauna"
                  width={0.5}
                  aspectRatio={1}
                  id = { 12}
                />
                <Card
                  image={{ uri: 'https://i.pinimg.com/736x/75/73/78/7573783da70edef3fa15c8b746115abd.jpg' }}
                  title="Fauna"
                  description="La mejor fauna"
                  width={0.5}
                  aspectRatio={1}
                  id = { 13}
                />
              </ScrollView>

            </ThemedView>
          </ThemedView>

        </ThemedView>
      </ScrollView>
    </ThemedView>





  );
}

const estilo = StyleSheet.create({
  padre: {
    flex: 1,
    paddingTop: 60 + (Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0)
  },

  buscador: {
    marginBottom: 32
  },

  header: {

  },

  body: {
    marginTop: 24
  },

  containerCarrusel: {

  },

  carrusel: {
    marginTop: 8
  },

  text: {
    marginLeft: 16,


  }


});
