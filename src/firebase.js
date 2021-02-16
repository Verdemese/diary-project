import firebase from "firebase/app";

import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATl0Fe0IATE2c1SlgWajbwRkGJz6qOZC4",
  authDomain: "english-diary-project.firebaseapp.com",
  databaseURL: "https://english-diary-project-default-rtdb.firebaseio.com",
  projectId: "english-diary-project",
  storageBucket: "english-diary-project.appspot.com",
  messagingSenderId: "115479339242",
  appId: "1:115479339242:web:c65c5d21e3f3ac2849b793",
  measurementId: "G-7N02KWNP5Q"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;