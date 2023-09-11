// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdAfmJhdIVi5J5GvPGOw3j9EoBvSF_U4Q",
  authDomain: "financely-58022.firebaseapp.com",
  projectId: "financely-58022",
  storageBucket: "financely-58022.appspot.com",
  messagingSenderId: "532718576205",
  appId: "1:532718576205:web:d73c0ec1fd4d180279f204",
  measurementId: "G-STQFRBRM2D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };
