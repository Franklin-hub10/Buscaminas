// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJWKyJ9DMaZWl5sw0AKrLPb1UeMuqbVQk",
  authDomain: "app-taller-14bf9.firebaseapp.com",
  databaseURL: "https://app-taller-14bf9-default-rtdb.firebaseio.com",
  projectId: "app-taller-14bf9",
  storageBucket: "app-taller-14bf9.firebasestorage.app",
  messagingSenderId: "888232455131",
  appId: "1:888232455131:web:9bda7716f6c721430255fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth( app )