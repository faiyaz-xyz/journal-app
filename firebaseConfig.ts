import { getApps, initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgFdValh5RVJAfx5lH68INiLiXdbByRS4",
  authDomain: "journal-app-edab4.firebaseapp.com",
  projectId: "journal-app-edab4",
  storageBucket: "journal-app-edab4.firebasestorage.app",
  messagingSenderId: "920466425018",
  appId: "1:920466425018:web:9c4b3a38f95bbc51922e83",
  measurementId: "G-1ECZ73C2QQ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };