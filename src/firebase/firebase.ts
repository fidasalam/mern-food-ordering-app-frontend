// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQA1me0o0GWTocnIF9aWRsL1Og0L--XbU",
    authDomain: "food-app-5ebe6.firebaseapp.com",
    projectId: "food-app-5ebe6",
    storageBucket: "food-app-5ebe6.appspot.com",
    messagingSenderId: "910575210922",
    appId: "1:910575210922:web:3f1ac93f1a5d3e1b941bd3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth };
