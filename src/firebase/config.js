import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBF5NELvWe3SovxLzTdCx9F89Ezbux2188",
  authDomain: "car-marketplace-9b824.firebaseapp.com",
  projectId: "car-marketplace-9b824",
  storageBucket: "car-marketplace-9b824.firebasestorage.app",
  messagingSenderId: "969787067884",
  appId: "1:969787067884:web:8843c767e43bada4c084c9",
  measurementId: "G-WQ7S7P3E3R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);