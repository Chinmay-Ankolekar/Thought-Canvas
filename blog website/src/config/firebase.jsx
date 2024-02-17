import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "abc",
  authDomain: "blog-website-a55c0.firebaseapp.com",
  projectId: "blog-website-a55c0",
  storageBucket: "blog-website-a55c0.appspot.com",
  messagingSenderId: "47908297663",
  appId: "1:47908297663:web:1bbb1743029383336b5f0a",
  measurementId: "G-WWQ8GH3TYK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
