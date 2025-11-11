// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCesa9ooxKpAIfSdFmk0SjaiN8L5v8VZ0U",
  authDomain: "appmuseo-9e4c7.firebaseapp.com",
  projectId: "appmuseo-9e4c7",
  storageBucket: "appmuseo-9e4c7.firebasestorage.app",
  messagingSenderId: "551952786487",
  appId: "1:551952786487:web:e4609e29cc1a83452c0bb2"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);

export default appFireBase;