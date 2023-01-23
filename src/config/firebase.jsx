// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcKz0puKhS1rpNCKO7NK9r_dYuTjQFJbQ",
  authDomain: "react-shop-4c0db.firebaseapp.com",
  projectId: "react-shop-4c0db",
  storageBucket: "react-shop-4c0db.appspot.com",
  messagingSenderId: "373972983527",
  appId: "1:373972983527:web:59a2d6a2b5faad84c98c42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getDatabase(app);
