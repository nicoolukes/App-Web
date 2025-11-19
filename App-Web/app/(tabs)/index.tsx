<<<<<<< HEAD

import { Platform, StyleSheet, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { router } from 'expo-router';
import HomeHeader from '@/components/HomeHeader';
import { useContext, useState } from 'react';
import Card from '@/components/Card';
import { StatusBar } from 'react-native';
import BuscarBoton from '@/components/BuscarBoton';
import Categoria from '@/components/Categoria';
import { UsuarioContext } from '../premiunContext';
import { Modal } from 'react-native';
import { Colors } from "../../constants/theme";
import { useColorScheme } from "../../hooks/use-color-scheme";
import { TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import CModal from '@/components/CModel';
=======
import Card from '@/components/Card';
import HomeHeader from '@/components/HomeHeader';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet } from 'react-native';

import BuscarBoton from '@/components/BuscarBoton';
import Categoria from '@/components/Categoria';
import { StatusBar } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from "react-native";

>>>>>>> main

const Stack = createNativeStackNavigator();

export default function Index() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
<<<<<<< HEAD
  const [modalVisible, setModalVisible] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
=======
  const router = useRouter();

  return (


>>>>>>> main

  const { usuario, esPremiun } = useContext(UsuarioContext) ?? { usuario: null, esPremiun: false };
 console.log("es premiunnnnnn:", esPremiun);
  

  return (
    <>
    <ThemedView style={estilo.padre}>
      <HomeHeader abrirMenu={() => setMenuVisible} abrirBuscador={() => setSearchVisible} titulo="Explorá las maravillas del museo" icon="arrow-back" />

      <ScrollView>
        <ThemedView style={estilo.body}>

          <ThemedView style={estilo.buscador}>
            <BuscarBoton />

          </ThemedView>
          {/* Botón Escanear QR */}
          <TouchableOpacity
            style={estilo.botonQr}
            onPress={() => (router as any).push("/qr")}
          >
            <MaterialIcons name="qr-code-scanner" size={28} color="white" />
            <ThemedText type="default" style={estilo.textoQr}>
              Escanear QR
            </ThemedText>
          </TouchableOpacity>


          <ScrollView horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 8, // espacio lateral
              gap: 8, // separa las tarjetas 
<<<<<<< HEAD

=======
              marginBottom: 24
>>>>>>> main
            }}>
            <Categoria
              icono="https://img.icons8.com/material-rounded/96/museum.png"
              title='Todo'
              categoria="Todo"
            />

            <Categoria
              icono="https://img.icons8.com/glyph-neue/64/dog-bone.png"
              title='Fosiles'
              categoria="Fosil"
            />
            <Categoria
              icono="https://img.icons8.com/ios-filled/50/dog-footprint.png"
              title='Mamiferos'
              categoria="Mamifero"
            />
            <Categoria
              icono="https://img.icons8.com/fluency-systems-filled/48/quill-pen.png"
              title='Aves'
              categoria="Ave"
            />
            <Categoria
              icono="https://img.icons8.com/sf-ultralight-filled/50/hammer.png"
              title='Herramientas'
              categoria="Herramienta"
            />
            <Categoria
              icono="https://img.icons8.com/ios-filled/50/modern-art.png"
              title='Pinturas Rupestres'
              categoria="Pinturas Rupestre"
            />
            <Categoria
              icono="https://img.icons8.com/metro/52/ant.png"
              title='Insectos'
              categoria="Insecto"
            />
            <Categoria
              icono="https://img.icons8.com/forma-thin-filled-sharp/48/lotus--v2.png"
              title='Flora'
              categoria="Flora"
            />
            <Categoria
              icono="https://img.icons8.com/material-rounded/48/particles.png"
              title='Piezas'
              categoria="Piesza"
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
                  image={{ uri: 'http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/img1(dino).jpg' }}
                  title="Fósil Pampeano"
                  description="Fósil encontrado en la Pampa "
                  width={0.6}
                  aspectRatio={2 / 3}
<<<<<<< HEAD
                  onPress={() => router.push({ pathname: '/DetalleColeccion', params: { id: 1, premiun: esPremiun ? 1 : 0 } })}
=======
                  id={1}
>>>>>>> main
                />
                <Card
                  image={{ uri: 'http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/img2(mano).jpg' }}
                  title="Mano Prehistórica"
                  description="Extremidad de Mamifero prehistorico"
                  width={0.6}
                  aspectRatio={2 / 3}
<<<<<<< HEAD
                  onPress={() => router.push({ pathname: '/DetalleColeccion', params: { id: 2, premiun: esPremiun ? 1 : 0 } })}
=======
                  id={2}
>>>>>>> main
                />
                <Card
                  image={{ uri: 'http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/img3(dino).jpg' }}
                  title="Dinosaurio Jurásico"
                  description="Esqueleto completo de dinosaurio  "
                  width={0.6}
                  aspectRatio={2 / 3}
<<<<<<< HEAD
                  onPress={() => router.push({ pathname: '/DetalleColeccion', params: { id: 3, premiun: esPremiun ? 1 : 0 } })}
=======
                  id={3}
>>>>>>> main
                />
                <Card
                  image={{ uri: 'http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/img4(piedra).jpg' }}
                  title="Bloque fósil"
                  description="Piedra con restos fósiles incrustados"
                  width={0.6}
                  aspectRatio={2 / 3}
<<<<<<< HEAD
                  onPress={() => router.push({ pathname: '/DetalleColeccion', params: { id: 4, premiun: esPremiun ? 1 : 0 } })}
=======
                  id={4}
>>>>>>> main
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
<<<<<<< HEAD
                  //id={10}
=======
                  id={10}
>>>>>>> main
                />
                <Card
                  image={{ uri: 'https://i.pinimg.com/1200x/7b/6d/ba/7b6dba82ccba3ba322d1120a8e0177a2.jpg' }}
                  title="Flora"
                  description="La mejor fauna"
                  width={0.5}
                  aspectRatio={1}
<<<<<<< HEAD
                  //id={11}
=======
                  id={11}
>>>>>>> main

                />
                <Card
                  image={{ uri: 'https://i.pinimg.com/736x/75/73/78/7573783da70edef3fa15c8b746115abd.jpg' }}
                  title="Fauna"
                  description="La mejor fauna"
                  width={0.5}
                  aspectRatio={1}
<<<<<<< HEAD
                  //id={12}
=======
                  id={12}
>>>>>>> main
                />
                <Card
                  image={{ uri: 'https://i.pinimg.com/736x/75/73/78/7573783da70edef3fa15c8b746115abd.jpg' }}
                  title="Fauna"
                  description="La mejor fauna"
                  width={0.5}
                  aspectRatio={1}
<<<<<<< HEAD
                  //id={13}
=======
                  id={13}
>>>>>>> main
                />
              </ScrollView>

            </ThemedView>
            <ThemedView style={estilo.carrusel}>
              <ThemedText type="subtitle" style={estilo.text}>¿Sabias que...?</ThemedText>
              <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 24, // espacio lateral
                  gap: 16, // separa las tarjetas 
                }}>
                <Card
                  image={{ uri: 'https://i.pinimg.com/736x/75/73/78/7573783da70edef3fa15c8b746115abd.jpg' }}
                  title="Sabias que..."
                  description="El zorro pampeano ayuda a mantener el equilibrio natural de La Pampa al controlar roedores."
                  width={0.9}
                  aspectRatio={16 / 9}
                  //id={10}
                  esPremium={esPremiun}
                  requierePremiun={true}
                  abrirModalPremiun={() => setModalVisible(true)}
                />
                <Card
                  image={{ uri: 'https://i.pinimg.com/1200x/7b/6d/ba/7b6dba82ccba3ba322d1120a8e0177a2.jpg' }}
                  title="Sabias que..."
                  description="El zorro pampeano ayuda a mantener el equilibrio natural de La Pampa al controlar roedores."
                  width={0.9}
                  aspectRatio={16 / 9}
                  //id={11}

                />
                <Card
                  image={{ uri: 'https://i.pinimg.com/736x/75/73/78/7573783da70edef3fa15c8b746115abd.jpg' }}
                  title="Sabias que..."
                  description="El zorro pampeano ayuda a mantener el equilibrio natural de La Pampa al controlar roedores."
                  width={0.9}
                  aspectRatio={16 / 9}
                  //id={12}
                />
                <Card
                  image={{ uri: 'https://i.pinimg.com/736x/75/73/78/7573783da70edef3fa15c8b746115abd.jpg' }}
                  title="Sabias que..."
                  description="El zorro pampeano ayuda a mantener el equilibrio natural de La Pampa al controlar roedores."
                  width={0.9}
                  aspectRatio={16 / 9}
                  //id={13}
                />
              </ScrollView>

            </ThemedView>

          </ThemedView>

        </ThemedView>
      </ScrollView>
      
    </ThemedView>
    <CModal
      visible={modalVisible}
      cerrarModal={()=>setModalVisible(false)}
    />

    
    
</>




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
    marginTop: 8
  },

  containerCarrusel: {

  },

  carrusel: {
    marginTop: 24
  },

  text: {
    marginLeft: 16,


  },
<<<<<<< HEAD
  p: {
    flex: 1,
    paddingTop: 32,
    //marginTop: 32

    //backgroundColor: '#D18A54',
  },

  modalFondo: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContenido: {
    width: '100%',
    padding: 24,
    borderRadius: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },

  listaBeneficios: {
    width: '100%',
    marginBottom: 24,
  },

  beneficio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  item: {
    fontSize: 16,
    marginLeft: 10,
  },

  botonActivar: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 50,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },

  textoActivar: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },

  cancelar: {
    marginTop: 6,
    fontSize: 15,
    opacity: 0.7,
  },

  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',             // altura del cajón
    bottom: 0,
    backgroundColor: '#222',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 10,
    paddingHorizontal: 20
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#555',
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 10
  },


  sheetTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center'
  },

  settingsGroup: {
    backgroundColor: '#2E2E2E',
    borderRadius: 18,
    paddingVertical: 6,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4
  },

  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#3A3A3A'
  },

  settingsText: {
    fontSize: 17,
    marginLeft: 14,
    color: '#fff'
  },

  closeButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center'
  },

  closeText: {
    fontSize: 17,
    fontWeight: '600'
  }
=======

  botonQr: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 24,
    elevation: 3, // sombra en android
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },
  textoQr: {
    color: "white",
    fontSize: 17,
    fontWeight: "600"
  },
>>>>>>> main



});
