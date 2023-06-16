import { initializeApp } from 'firebase/app';
import {getStorage} from 'firebase/storage'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCkyhJiXhC7dTcjgNNGfe5tAFFtfti9gFw",
    authDomain: "glowupfans.firebaseapp.com",
    projectId: "glowupfans",
    storageBucket: "glowupfans.appspot.com",
    messagingSenderId: "658964120269",
    appId: "1:658964120269:web:11b86d6f2dfa8b2a56df84",
    measurementId: "G-N3Z09JZ65G"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
