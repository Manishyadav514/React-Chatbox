import { initializeApp } from 'firebase/app';
import {getAuth} from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
      //configuration, you will get these values from firebase once you create the project
      apiKey: "AIzaSyDazwdAUDlT9JligyjPHJrx3fvRskHLMe0",
      authDomain: "chatbox-d6e1b.firebaseapp.com",
      projectId: "chatbox-d6e1b",
      storageBucket: "chatbox-d6e1b.appspot.com",
      messagingSenderId: "148921123108",
      appId: "1:148921123108:web:8b097c140d4ed3e6ddf3b1",
      measurementId: "G-Z0LN4RM839"
};

const app = initializeApp(firebaseConfig);
export const firebase_authentication = getAuth(app);