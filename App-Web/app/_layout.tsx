// NOTIFICACIONES + QR + TODO INTEGRADO ↓↓↓

import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from 'react'; 
// EXPO NOTIFICATIONS
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

// QR — si más adelante agregan libs, ya queda preparado
// import * as BarCodeScanner from 'expo-barcode-scanner';

// FONTS Y THEME (lo que ya estaba)
import { useColorScheme } from '@/hooks/use-color-scheme';
import { MerriweatherSans_400Regular, MerriweatherSans_700Bold } from '@expo-google-fonts/merriweather-sans';
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import PremiunProvider from '../context/premiunContext';

export const unstable_settings = {
  anchor: '(tabs)',
};

// Handler global: como se muestran las notificaciones en foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowAlert: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Pedir permisos
async function askNotificationPermissions() {
  try {
    const settings = await Notifications.getPermissionsAsync();
    if (settings.status !== 'granted') {
      const newSettings = await Notifications.requestPermissionsAsync();
      return newSettings.status === 'granted';
    }
    return true;
  } catch (e) {
    console.warn('No se pudieron pedir permisos:', e);
    return false;
  }
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const checkBiometrics = async () => {

      const isLoged = await AsyncStorage.getItem("logueo");
      console.log("logeo", isLoged)
      const biometria = await AsyncStorage.getItem("biometria_activada");
      console.log("bior", isLoged)
      if (isLoged=== "true") {
        if (biometria === "true") {
          // pedimos huella
          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Verificación con huella',
          });

          if (result.success) {
            // Huella correcta
            setLoading(false);
          } else {
            // Huella fallida 
            router.replace('/Login');
            setLoading(false);
          }
        } else {

          router.replace('/Login');
        }
      }else{
        router.replace('/(tabs)')
        setLoading(false)
      }
      

    };

    checkBiometrics();
  }, []);

 

  
    //Suscripciones a eventos
   const receivedSub = useRef<Notifications.Subscription | null>(null);
    const responseSub = useRef<Notifications.Subscription | null>(null);
  
    // Cargar fuentes (lo que ya estaba)
    const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_600SemiBold,
      MerriweatherSans_400Regular,
      MerriweatherSans_700Bold,
    });
  
    useEffect(() => {
      if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded]);
  
    // INICIALIZAR NOTIFICACIONES ACÁ
    useEffect(() => {
      if (!Device.isDevice) {
        console.warn("Notificaciones push no funcionan en emulador.");
        return;
      }
  
      // Canal en Android
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
        }).catch(() => { });
      }
  
      (async () => {
        const granted = await askNotificationPermissions();
        if (!granted) return;
  
        try {
          // Necesario para obtener token en Expo Router
          const projectId =
            Constants.expoConfig?.extra?.eas?.projectId ??
            Constants.easConfig?.projectId;
  
          const token = await Notifications.getExpoPushTokenAsync({ projectId });
          console.log("TOKEN PUSH GRUPO:", token.data);  
        } catch (err) {
          console.warn("Error obteniendo token:", err);
        }
      })();
  
      // Listener foreground
      receivedSub.current = Notifications.addNotificationReceivedListener((notif) => {
        console.log("Notificación recibida:", notif);
      });
  
      // Listener cuando el usuario toca la noti
      responseSub.current = Notifications.addNotificationResponseReceivedListener((resp) => {
        const data = resp.notification.request.content.data as any;
  
        if (data?.obraId) {
          router.push({ pathname: '/DetalleColeccion', params: { id: 1} });
        }
      });
  
  
      return () => {
        receivedSub.current?.remove();
        responseSub.current?.remove();
      };
    }, []);


  return (
    <PremiunProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="DetalleColeccion" options={{ headerShown: false }} />
          <Stack.Screen name="colecciones" options={{ headerShown: false }} />
          <Stack.Screen name="resultadosBusqueda" options={{ headerShown: false }} />
          <Stack.Screen name="testNoti" options={{ headerShown: true, title: "Probar Notificación" }} />
          
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PremiunProvider>
  );
}


