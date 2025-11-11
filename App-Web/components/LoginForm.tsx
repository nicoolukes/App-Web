import appFireBase from '../credenciales';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { ThemedView } from './themed-view';
import { View, StyleSheet } from 'react-native';
import CampoInput from './CampoInput';
import Boton from './Boton';
import { useColorScheme } from '../hooks/use-color-scheme';
import { Colors } from '../constants/theme';

const autenticacion = getAuth(appFireBase);

export default function LoginForm({onSubmit}: {onSubmit: () => void}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];

    const logueo = async() => {
        try {
            await signInWithEmailAndPassword(autenticacion, email, password)
            onSubmit();
        }catch(error) {
            console.log(error);
        }
    }
    
    return(
        <ThemedView style={[estilo.contenedor, /*{ backgroundColor: colors.superficie }*/]}>
            <ThemedView /*style={{backgroundColor: colors.superficie}}*/ >
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

