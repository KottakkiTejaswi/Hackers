// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (replace with your own)
const firebaseConfig = {
    apiKey: "AIzaSyCqtrEqnMISGJPhzAZLOMkQmxC7tiRw-GQ",
    authDomain: "hackers-e6de3.firebaseapp.com",
    projectId: "hackers-e6de3",
    storageBucket: "hackers-e6de3.firebasestorage.app",
    messagingSenderId: "585049185288",
    appId: "1:585049185288:web:518789d4fc2282e7d185bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth , db};