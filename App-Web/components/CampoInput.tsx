import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";
import { TextInput } from "react-native";
import React from 'react';
import { StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Colors } from "../constants/theme";
import { useColorScheme } from "../hooks/use-color-scheme";

export default function CampoInput({ icon, placeholder, placeholderTextColor, label, value, onChangeText, secureTextEntry = false }: { icon?: React.ComponentProps<typeof Ionicons>['name'], placeholder: string, placeholderTextColor: string, label: string, value: string, onChangeText: (text: string) => void, secureTextEntry?: boolean }) {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    return(
        
        <ThemedView style={[estilo.contenedorIputs,]} >
            <ThemedText style={[estilo.label,]}> {label} </ThemedText>
            <ThemedView style={[estilo.inputContainer, {borderColor: colors.bordes}] }>
                {icon && <Ionicons name={icon} size={20} color={colors.icon} style={estilo.icono} />}
                <TextInput style={[estilo.input, {color:colors.text} ]}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    value={value}
                    onChangeText= {onChangeText}
                    secureTextEntry= {secureTextEntry}
                />
            </ThemedView>
        </ThemedView>
    )
}

const estilo= StyleSheet.create({
    contenedorIputs:{
        marginBottom:24,
    },

    label:{
        marginBottom: 8,
        fontSize: 16,
        fontWeight: '500',
        

    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        
      
        borderRadius: 24,
        paddingHorizontal: 16,
        //backgroundColor: '#fff',
    },
    icono:{
        marginRight: 8,

    },
    input:{
        flex: 1,
        height: 50,
        fontSize: 14,
        
    },
    
})