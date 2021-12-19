import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAjQT9VsTByDdwd4qYp6O-x-xfYIARMt4k",
  authDomain: "torneos-app.firebaseapp.com",
  databaseURL: "https://torneos-app.firebaseio.com",
  projectId: "torneos-app",
  storageBucket: "torneos-app.appspot.com",
  messagingSenderId: "968423899594",
  appId: "1:968423899594:web:db21cde333eef4cc164f33",
  measurementId: "G-DD6L06P5PK",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();

export default firebase;
