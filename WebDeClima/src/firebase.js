// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCTUCueBHk1JvItj07sblhLW2bA8khlbw",
  authDomain: "webdeclima.firebaseapp.com",
  projectId: "webdeclima",
  storageBucket: "webdeclima.appspot.com",
  messagingSenderId: "350645856003",
  appId: "1:350645856003:web:558e29b3f9fb5cc6736b36",
  measurementId: "G-64J6D0MQDE"
};

// Inicializo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Inicializo Firebase Authentication
export const auth = getAuth(app);
