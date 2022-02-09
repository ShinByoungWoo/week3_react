// 파이어 베이스 컴포넌트

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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
const apiKey = firebaseConfig.apiKey;
const firestore = firebase.firestore();
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
