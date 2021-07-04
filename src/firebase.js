import firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB-0zjgf5JkYdfKg6vZqCJWpM49tdunEkg",
  authDomain: "singals-dfa5b.firebaseapp.com",
  projectId: "singals-dfa5b",
  storageBucket: "singals-dfa5b.appspot.com",
  messagingSenderId: "598258784386",
  appId: "1:598258784386:web:7e4aed5c7bdb2cc9e83c9b"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();