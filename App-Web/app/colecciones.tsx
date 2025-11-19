import Header from "@/components/Header";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Colors } from "@/constants/theme";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Card from "@/components/Card";
import { FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { ThemedText } from "@/components/themed-text";
import CardCollec from "@/components/CardCollec";


export default function ColeccionScreen() {
    const colorScheme = useColorScheme();
    const colors = Colors[colorScheme ?? 'light'];
    const { categoria } = useLocalSearchParams();
    console.log("la categoria es:", categoria);

    const [datos, setDatos] = useState<any[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDatos = async () => {
            try {
                setCargando(true);
                setError(null);


                const respuesta = await fetch(`http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/endpoints/listar_img.php?categoria=${categoria}`);

                if (!respuesta.ok) throw new Error('Error al obtener los datos');

                const data = await respuesta.json();
                console.log("Datos obtenidos:", data);
                setDatos(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };

        fetchDatos();
    }, [categoria]);

    const renderCards = ({ item }: any) => (
        <CardCollec
            image={`http://192.168.1.12/APP-WEB/App-Web/API_Proyecto/uploads/${item.nombre_archivo}`}
            title={item.titulo}
            id={item.id}
            description=""
            
            
        />
    );

    return (
        <ThemedView style={{ flex: 1 }}>
            <Header title={`Colección: ${categoria}`} />

            {cargando ? (
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                    style={{ marginTop: 124 }}
                />
            ) : error ? (
                <ThemedText style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>
                    {error}
                </ThemedText>
            ) : (
                <FlatList
                    data={datos}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderCards}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={estilos.lista}
                    ListEmptyComponent={
                        <ThemedText>No se encontraron elementos.</ThemedText>
                    }
                />
            )}
        </ThemedView>

    )

}

const estilos = StyleSheet.create({
    lista: {
        padding: 16,
        paddingTop: 100,
        gap: 16,


    }
});