import { useEffect, useState } from "react";
import { ThemedView } from "./themed-view";
import { ThemedText } from "./themed-text";
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "expo-router";



export default function Buscador(){
    const [texto, setTexto]= useState('');
    const navegar = useNavigation<any>();



    useEffect(()=>{
        const delay = setTimeout(()=>{
            if(texto.trim().length > 0){
                buscarEnApi(texto);
            }
        }, 1000);

        return ()=>clearTimeout(delay);
    }, [texto])


    

    const buscarEnApi = async (query: string): Promise<void>=>{
        const datosSimulados = [
            { id: 1, nombre: 'Colección de arte' },
            { id: 2, nombre: 'Historia natural' },
            { id: 3, nombre: 'Fotografía antigua' },
        ];

        navegar.navigate('resultadosBusqueda', { resultados: datosSimulados, query });

        /*try{
           
            const resultado = await fetch(`https://tu-api.com/buscar?query=${query}`);
            const datos = await resultado.json();

            navegar.navidate('ResultadoBusqueda', {resultados: datos, query})
            
        }catch (error){
            console.error('Error al buscar', error)
        }*/
    };

    

    return(
        <ThemedView style= {estilo.container}>
            <TextInput 
                placeholder= "Buscá en el museo..."
                placeholderTextColor={'#B3ADA3'}
                value= {texto}
                onChangeText={setTexto}
                style= {estilo.input}
            />
        </ThemedView>
    )
}

const estilo= StyleSheet.create({
    container:{
        flex: 1,
        padding: 16,
    },

    input:{
        height: 56,
        borderColor: 'gray',
        borderWidth: 1.5,
        borderRadius: 32,
        paddingHorizontal: 16,
        color: 'white', // Asegúrate de que el texto sea visible
        marginBottom: 10,
    },

    itemContent:{
        
    },

    itemContainer:{
        paddingVertical: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },

    itemText:{
        fontSize: 16,
    },

    listContainer:{
        paddingBottom: 20
    },

    textoVacio:{
        marginTop: 20,
        textAlign: 'center',
        color: '#B3ADA3',
    }


})