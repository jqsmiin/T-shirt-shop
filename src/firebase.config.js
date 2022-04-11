// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3OrLFxDW3tZ3_pOaZkAkEgTLHl6HYLUI",
  authDomain: "wear-app-6fb70.firebaseapp.com",
  projectId: "wear-app-6fb70",
  storageBucket: "wear-app-6fb70.appspot.com",
  messagingSenderId: "189670551656",
  appId: "1:189670551656:web:379474308933781d7a8bdd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()