// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCRlvsHx1VTl4KJfLHizDheI4bPRI_8yCQ",
  authDomain: "bookme-52100.firebaseapp.com",
  projectId: "bookme-52100",
  storageBucket: "bookme-52100.appspot.com",
  messagingSenderId: "54341310261",
  appId: "1:54341310261:web:2e228ae604a208f8acde7c",
  measurementId: "G-D1J4SGRM60"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);