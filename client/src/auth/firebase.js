// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNm8K5zq95_pWMO1fT6fsumO9GRGcxzig",
  authDomain: "todoapp-4c01e.firebaseapp.com",
  projectId: "todoapp-4c01e",
  storageBucket: "todoapp-4c01e.appspot.com",
  messagingSenderId: "74409345330",
  appId: "1:74409345330:web:14bf55b5ace50079bc972b"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export const authenthication = getAuth(firebase);
export const db = getFirestore(firebase)
// export const auth = firebase.auth(); // Export Firebase Auth service
export default firebase;