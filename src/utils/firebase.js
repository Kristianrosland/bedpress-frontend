import firebase from 'firebase/app';
require('firebase/firestore')

var config = {
  apiKey: "AIzaSyDiKrfHJq-FYHoHE13jPtMCbWs1N2hKDCg",
  authDomain: "bedpress-backend.firebaseapp.com",
  databaseURL: "https://bedpress-backend.firebaseio.com",
  projectId: "bedpress-backend",
  storageBucket: "bedpress-backend.appspot.com",
  messagingSenderId: "777181904263"
};

firebase.initializeApp(config);
export const db = firebase.firestore();
