// sendPush.js
import fetch from "node-fetch"; // si usás Node 18+ podés omitirlo y usar fetch directamente

// token del dispositivo (Expo push token que ves en consola)
const EXPO_PUSH_TOKEN = "ExponentPushToken[jRjTEJNvYSq5Hjp1g0clwI]"; 

async function sendPushNotification() {
  const message = {
    to: EXPO_PUSH_TOKEN,
    title: "🎨 Nueva obra agregada",
    body: "Entrá para ver los nuevos detalles del museo",
    data: { obraId: "obra_123" },
  };

  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const data = await response.json();
  console.log("Respuesta Expo:", data);
}

sendPushNotification().catch(console.error);
