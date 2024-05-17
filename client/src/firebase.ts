// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogapp-7ca6c.firebaseapp.com",
  projectId: "blogapp-7ca6c",
  storageBucket: "blogapp-7ca6c.appspot.com",
  messagingSenderId: "545882310976",
  appId: "1:545882310976:web:6b6918ba91413f33f212a5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);