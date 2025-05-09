// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-lPCe6WZILkijOYe-XIrW6zMFdhtwQuE",
  authDomain: "login-e2a97.firebaseapp.com",
  projectId: "login-e2a97",
  storageBucket: "login-e2a97.firebasestorage.app",
  messagingSenderId: "284830171659",
  appId: "1:284830171659:web:d59f7859116f4a57db3d0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;