import React from 'react';
import { GestureResponderEvent, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Colors } from '../constants/theme';
import { ThemedText } from './themed-text';

const Boton = ({titulo, onPress, color}: {titulo: string, onPress: (event: GestureResponderEvent) => void, color?: string}) => {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    return(
        <TouchableOpacity
            style={[estilo.button, { backgroundColor: color}]}
            onPress= {onPress}
            activeOpacity={0.7}
        >
        <ThemedText type="defaultSemiBold" style={estilo.b_texto}> {titulo} </ThemedText>
        </TouchableOpacity>
    );
    
};

export default Boton;

const estilo = StyleSheet.create({
    button: {
        padding: 16,
        borderRadius: 32,
        marginTop: 32,
        shadowColor: '#171717ff',
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,

    },

    b_texto:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
       
        
    }
    
})