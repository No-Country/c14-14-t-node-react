import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

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
// Inicializo Firebase Authentication
export const auth = getAuth(app);




