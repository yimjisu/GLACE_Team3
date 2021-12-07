import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzBoCysln_dVEhiIN32SRVC8quiJam45g",
  authDomain: "glace-team3.firebaseapp.com",
  projectId: "glace-team3",
  storageBucket: "glace-team3.appspot.com",
  messagingSenderId: "560128669638",
  appId: "1:560128669638:web:d98915021e10d90a7a64c7",
  measurementId: "G-6X25RZWWJM"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const firestore = firebase.firestore();

export { firestore, db };