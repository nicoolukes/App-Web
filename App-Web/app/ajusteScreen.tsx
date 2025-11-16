import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native';

export default function ajusteScreen() {
  const screenHeight = Dimensions.get('window').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const openSheet = () => {
    Animated.timing(translateY, {
      toValue: screenHeight * 0.4, // sube hasta 60% de pantalla (40% visible abajo)
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  const closeSheet = () => {
    Animated.timing(translateY, {
      toValue: screenHeight, // vuelve a bajar
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openSheet} style={styles.button}>
        <Text style={styles.buttonText}>Abrir Cajón</Text>
      </TouchableOpacity>

      <Animated.View
        style={[
          styles.sheet,
          { transform: [{ translateY }] }
        ]}
      >
        <View style={styles.handle} />
        <Text style={{ color: '#fff', textAlign: 'center' }}>Este es tu bottom sheet</Text>

        <TouchableOpacity onPress={closeSheet} style={styles.closeButton}>
          <Text style={{ color: '#000' }}>Cerrar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111'
  },
  button: {
    backgroundColor: '#4DC0FF',
    padding: 15,
    borderRadius: 10
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold'
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '60%',             // altura del cajón
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
  closeButton: {
    marginTop: 20,
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center'
  }
});