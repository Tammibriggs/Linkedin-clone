// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmqh0XedT0mQdBm5PvcUIoerhk5StheeY",
  authDomain: "linkedin-clone-7bda9.firebaseapp.com",
  projectId: "linkedin-clone-7bda9",
  storageBucket: "linkedin-clone-7bda9.appspot.com",
  messagingSenderId: "769673024480",
  appId: "1:769673024480:web:f092d5d114ced135355185"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
const provider = new GoogleAuthProvider()

export default db
export {auth, storage, provider}