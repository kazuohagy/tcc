import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/auth';
import 'firebase/database';
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCjgPe0vmY7thIgBubGp45BflEzsq98CYA",
    authDomain: "gaia-25c62.firebaseapp.com",
    projectId: "gaia-25c62",
    storageBucket: "gaia-25c62.appspot.com",
    messagingSenderId: "1018019238870",
    appId: "1:1018019238870:web:ec173febc950f233764a77",
    measurementId: "G-YRBPCCYHHC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.auth();

export default db;
