import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyChV8u9Oh_uRs6Czf62ED6WCT1ypmkT2PA",
  authDomain: "ebazaar-dc176.firebaseapp.com",
  projectId: "ebazaar-dc176",
  storageBucket: "ebazaar-dc176.appspot.com",
  messagingSenderId: "994305474748",
  appId: "1:994305474748:web:0e8440718bc449923e90b9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
