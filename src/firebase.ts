// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

console.log(import.meta.env.VITE_FIREBASE_API_KEY);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-chat-85afe.firebaseapp.com",
  projectId: "react-chat-85afe",
  storageBucket: "react-chat-85afe.appspot.com",
  messagingSenderId: "307997813910",
  appId: "1:307997813910:web:667f9a40d8477b54d666b7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
export default app;