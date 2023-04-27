import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {getStorage} from 'firebase/storage';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyDcJO6qVhhgK5ILBpgpusiR_BUAo4MgpS8",
    authDomain: "vubble-68af5.firebaseapp.com",
    databaseURL: "https://vubble-68af5-default-rtdb.firebaseio.com",
    projectId: "vubble-68af5",
    storageBucket: "vubble-68af5.appspot.com",
    messagingSenderId: "431221834103",
    appId: "1:431221834103:web:ac632a4f99a440311d2172",
    measurementId: "G-SH4BW2W65V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
export let user = null;
export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider).then((res) => {
    user = res.user;
  }).catch((error) => {
    console.log(error.message);
  })
}

export const storage = getStorage(app);
export const database = getDatabase(app);