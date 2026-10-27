// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS4PDppXvh9oTMH4iIOfhzBPwJVTqZWkw",
  authDomain: "companydashboard-1f274.firebaseapp.com",
  projectId: "companydashboard-1f274",
  storageBucket: "companydashboard-1f274.firebasestorage.app",
  messagingSenderId: "156721477369",
  appId: "1:156721477369:web:2b171eb5c8cdf1a116d428",
  measurementId: "G-0YFY1VZF16"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
