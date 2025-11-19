// NOTIFICACIONES + QR + TODO INTEGRADO ↓↓↓

import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';

// ⚡ EXPO NOTIFICATIONS
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

// ⚡ QR — si más adelante agregan libs, ya queda preparado
// import * as BarCodeScanner from 'expo-barcode-scanner';

// FONTS Y THEME (lo que ya estaba)
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { PremiunProvider } from './premiunContext';


export const unstable_settings = {
  anchor: '(tabs)',
};

// 🟩 Handler global: cómo se muestran las notificaciones en foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowAlert: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// 🟩 Pedir permisos
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

  // 🔔 Suscripciones a eventos
  const receivedSub = useRef<Notifications.Subscription | null>(null);
  const responseSub = useRef<Notifications.Subscription | null>(null);

  // 🟩 Cargar fuentes (lo que ya estaba)
  

  // 🟩 INICIALIZAR NOTIFICACIONES ACÁ
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

        // Aquí podrías guardarlo en backend:

        // fetch("https://miapi.com/notiTokens", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ token: token.data })
        // });

      } catch (err) {
        console.warn("Error obteniendo token:", err);
      }
    })();

    // Listener foreground
    receivedSub.current = Notifications.addNotificationReceivedListener((notif:any) => {
      console.log("📩 Notificación recibida:", notif);
    });

    // Listener cuando el usuario toca la noti
    responseSub.current = Notifications.addNotificationResponseReceivedListener((resp:any) => {
      const data = resp.notification.request.content.data as any;

      if (data?.obraId) {
        router.push(`/obra/${String(data.obraId)}` as any);
      }
    });


    return () => {
      receivedSub.current?.remove();
      responseSub.current?.remove();
    };
  }, []);

  

  return (
    /*<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Rutas principales }
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="DetalleColeccion" options={{ headerShown: false }} />

        {/* 🟩 Nueva ruta del QR }
        <Stack.Screen name="qr" options={{ headerShown: true, title: "Escanear QR" }} />

        {/* 🟩 Ruta de testeo de notificaciones }
        <Stack.Screen name="testNoti" options={{ headerShown: true, title: "Probar Notificación" }} />

        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>*/
    <PremiunProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="Login" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="DetalleColeccion" options={{ headerShown: false }} />
           {/* 🟩 Nueva ruta del QR */}
        <Stack.Screen name="qr" options={{ headerShown: true, title: "Escanear QR" }} />

        {/* 🟩 Ruta de testeo de notificaciones */}
        <Stack.Screen name="testNoti" options={{ headerShown: true, title: "Probar Notificación" }} />
          <Stack.Screen name="resultadosBusqueda" options={{ headerShown: false }} />
          <Stack.Screen name="colecciones" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PremiunProvider>
  );
}
