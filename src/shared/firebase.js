import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4zbwkrqE2GKzrPZWIBI-hEk9E39fXLSE",
  authDomain: "week3-react.firebaseapp.com",
  projectId: "week3-react",
  storageBucket: "week3-react.appspot.com",
  messagingSenderId: "106199090880",
  appId: "1:106199090880:web:5be6bdb28e39022fefcf25",
  measurementId: "G-E2DVLQVS4R",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export { auth };