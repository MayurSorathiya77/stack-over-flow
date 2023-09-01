// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN6wQ5hCKXoaain6Ldqkit5PRpGmb8rPs",
  authDomain: "stack-overflow-clone-2ff59.firebaseapp.com",
  projectId: "stack-overflow-clone-2ff59",
  storageBucket: "stack-overflow-clone-2ff59.appspot.com",
  messagingSenderId: "1009699828433",
  appId: "1:1009699828433:web:189fe69823e2d4997c8bf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();