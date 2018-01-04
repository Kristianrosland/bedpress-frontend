import firebase from 'firebase/app';
require('firebase/firestore')

export const uiConfig = {
  signInFlow: 'redirect',
  signInSuccessUrl: '/',
  tosUrl: 'www.fagutvalget.no',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

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
