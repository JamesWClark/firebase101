// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBlIYySk2d00g5tPTuJ8VMdF848ex70tcI",
  authDomain: "fir-101-6d77d.firebaseapp.com",
  projectId: "fir-101-6d77d",
  storageBucket: "fir-101-6d77d.appspot.com",
  messagingSenderId: "268031330997",
  appId: "1:268031330997:web:3a9dd4da0bbbc9514d0cfc",
  measurementId: "G-QH36F2ERLY"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);