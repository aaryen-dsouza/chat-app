// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-a9e4b.firebaseapp.com",
  projectId: "chat-app-a9e4b",
  storageBucket: "chat-app-a9e4b.appspot.com",
  messagingSenderId: "72859260461",
  appId: "1:72859260461:web:ce56a10a22a648c6090aa4",
  measurementId: "G-R2XJCVEX99",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage()
// const analytics = getAnalytics(app);
