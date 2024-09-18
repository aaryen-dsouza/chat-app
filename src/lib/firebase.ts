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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
// const analytics = getAnalytics(app);
