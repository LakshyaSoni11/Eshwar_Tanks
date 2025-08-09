import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // <-- Make sure this import exists if using Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAh4hlAZ9XeMog8T59B1kCAIeWxEdlzdUM",
  authDomain: "eshwar-tanks-7cd36.firebaseapp.com",
  projectId: "eshwar-tanks-7cd36",
  storageBucket: "eshwar-tanks-7cd36.appspot.com", // ✅ Corrected: `.app` ➝ `.appspot.com`
  messagingSenderId: "728493565776",
  appId: "1:728493565776:web:1c16781b01f9d2513d2e55",
  measurementId: "G-2PY5RW34E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
