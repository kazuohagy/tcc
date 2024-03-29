import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage } from "firebase/storage";
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
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const storage = getStorage(app);
export default db;