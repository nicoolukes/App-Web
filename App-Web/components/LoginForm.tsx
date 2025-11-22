import appFireBase from '../credenciales';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { ThemedView } from './themed-view';
import { View, StyleSheet } from 'react-native';
import CampoInput from './CampoInput';
import Boton from './Boton';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Colors } from '../constants/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { auth } from '../credenciales';
import { router} from "expo-router";
import * as LocalAuthentication from 'expo-local-authentication';

//const autenticacion = getAuth(appFireBase);

export default function LoginForm({onSubmit}: {onSubmit: () => void}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const [loading, setLoading] = useState(true);

    const logueo = async() => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            onSubmit();
        }catch(error) {
            console.log(error);
        }
    }
    
    
    return(
        <ThemedView style={[estilo.contenedor,]}>
            <ThemedView  >
                <CampoInput 
                    icon="mail-outline"
                    placeholder="Email"
                    placeholderTextColor={colors.textSecond} 
                    label="Correo Electrónico"
                    value={email}
                    onChangeText={setEmail}
                />

               <CampoInput 
                    icon="lock-closed-outline" 
                    placeholder="Contraseña"
                    placeholderTextColor={colors.textSecond} 
                    label="Contraseña"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
               />
                
            </ThemedView>

            <Boton
                titulo="Iniciar Sesión"
                onPress={() => {
                    logueo();
                }}
                color={colors.primary}
            />
        </ThemedView>

    )
}

const estilo= StyleSheet.create({
    contenedor:{
        marginTop:16,
        
    },
    contenedorC:{
       
    }
})

