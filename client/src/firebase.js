// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "movie-mania-007.firebaseapp.com",
  projectId: "movie-mania-007",
  storageBucket: "movie-mania-007.appspot.com",
  messagingSenderId: "1031175744133",
  appId: "1:1031175744133:web:7f749d7146fc6eb5ff97ec"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);