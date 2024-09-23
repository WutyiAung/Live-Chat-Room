import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDv0vhkZdqTJr8Me27gMmw9SmBQs-AOZ0",
  authDomain: "vue-blog-project-83ab0.firebaseapp.com",
  projectId: "vue-blog-project-83ab0",
  storageBucket: "vue-blog-project-83ab0.appspot.com",
  messagingSenderId: "814835927158",
  appId: "1:814835927158:web:4a65fa7ed15b21e239b757"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

// Get server timestamp
const timestamp = serverTimestamp();

export { db, timestamp, auth };
