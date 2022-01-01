import './App.css';
// import {SignOut} from './authentication/SignOut';
// import {SignIn} from './authentication/SignIn';
import Home from './components/Home';
// import {ChatRoom} from './chatbox/ChatRoom';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import {firebase_authentication} from './authentication/FirebaseConfiguration';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import React, { useRef, useState } from 'react';


const app = firebase.initializeApp({
  //configuration, you will get these values from firebase once you create the project
  apiKey: "AIzaSyDazwdAUDlT9JligyjPHJrx3fvRskHLMe0",
  authDomain: "chatbox-d6e1b.firebaseapp.com",
  projectId: "chatbox-d6e1b",
  storageBucket: "chatbox-d6e1b.appspot.com",
  messagingSenderId: "148921123108",
  appId: "1:148921123108:web:8b097c140d4ed3e6ddf3b1",
  measurementId: "G-Z0LN4RM839"
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>ChatBox</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}




function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Chat With Your Friends!</p>
    </>
  )

}




function SignOut() {
  return firebase.auth().currentUser && (
    <button className="sign-out" onClick={() => firebase.auth().signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  // let profile = firebase.auth().currentUser;
  // console.log(profile.email);
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      // photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" disabled={!formValue}>Submit</button>

    </form>
  </>)
}




function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div >
      {/* <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /> */}
      <p>{text}</p>
    </div>
  </>)
}




export default App;
