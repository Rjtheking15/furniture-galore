

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyATXZOj8K1BejoNr-2KjhLc2vA1Wty4Q5Q",
  authDomain: "furniture-galore-77a11.firebaseapp.com",
  projectId: "furniture-galore-77a11",
  storageBucket: "furniture-galore-77a11.firebasestorage.app",
  messagingSenderId: "964440963715",
  appId: "1:964440963715:web:699bf16e009f3f6f3bf9b6",
  measurementId: "G-KTBLW4CPFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;   