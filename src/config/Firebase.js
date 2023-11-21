import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5_RcSU-EcHFHgsW0Lts0VbyrLV9GgxaM",
  authDomain: "fir-102-a1e12.firebaseapp.com",
  projectId: "fir-102-a1e12",
  storageBucket: "fir-102-a1e12.appspot.com",
  messagingSenderId: "921393008132",
  appId: "1:921393008132:web:068e4150d8225e94e5ef51"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);