// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth,getReactNativePersistence ,uid} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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


// getAuth()
//   .getUser('Yrg3TsgndKW92LAvnyaGVL7jnfA3')
//   .then((userRecord) => {
//     // See the UserRecord reference doc for the contents of userRecord.
//     console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
//   })
//   .catch((error) => {
//     console.log('Error fetching user data:', error);
//   });


export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);