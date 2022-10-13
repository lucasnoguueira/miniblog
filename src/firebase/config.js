import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDmLC_aQfbw_pwDwk0txCIAIWrSau6CiAM",
  authDomain: "miniblog-c46a2.firebaseapp.com",
  projectId: "miniblog-c46a2",
  storageBucket: "miniblog-c46a2.appspot.com",
  messagingSenderId: "241377173384",
  appId: "1:241377173384:web:cf8a5a5b5ec45a0540243d"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db} 