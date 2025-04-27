



import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {getFirestore, collection, addDoc,getDoc, getDocs, deleteDoc, doc ,updateDoc,serverTimestamp ,query, where } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";
import { getAuth,signInWithPopup,createUserWithEmailAndPassword ,GoogleAuthProvider,onAuthStateChanged,signOut,sendPasswordResetEmail,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC0bNLDlhymTDIqj1qZg4izwVpuISdNoGc",
  authDomain: "hackathon-fda9c.firebaseapp.com",
  projectId: "hackathon-fda9c",
  storageBucket: "hackathon-fda9c.firebasestorage.app",
  messagingSenderId: "1037433261265",
  appId: "1:1037433261265:web:fe8b51b41586081410c9f0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export{db, collection, addDoc, getDocs, deleteDoc,query, where, doc ,updateDoc,serverTimestamp ,
    auth,createUserWithEmailAndPassword,onAuthStateChanged,signOut,sendPasswordResetEmail
,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,getDoc }


