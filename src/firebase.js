// src/firebase.js

// 1) Core SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

// 2) Your actual Firebase config
const firebaseConfig = {
  apiKey:            "AIzaSyDgq36LaYf2r-Ft8I_tIrfICXzuGbyb4LA",
  authDomain:        "roomatch-prod-e8ac1.firebaseapp.com",
  projectId:         "roomatch-prod-e8ac1",
  storageBucket:     "roomatch-prod-e8ac1.firebasestorage.app",
  messagingSenderId: "74452585491",
  appId:              "1:74452585491:web:81eb5690fbdf02ca07c3e6",
  measurementId:     "G-M6912FG011"
};

// 3) Initialize Firebase
const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);
const analytics = getAnalytics(app);

// 4) Export everything you need
export {
  auth,
  db,
  analytics,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
};
