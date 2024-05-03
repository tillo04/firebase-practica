import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARK3Ff43ddSyKA_kZdhrQjwqvL_kZFDqg",
  authDomain: "gestion-app-tomas.firebaseapp.com",
  projectId: "gestion-app-tomas",
  storageBucket: "gestion-app-tomas.appspot.com",
  messagingSenderId: "1018548917030",
  appId: "1:1018548917030:web:25a5dde44f61997b7027e7"
};
const app = initializeApp(firebaseConfig);
export const initDatabase = getFirestore(app);
export const initStorage = getStorage(app);
export const initAuth = getAuth(app);

