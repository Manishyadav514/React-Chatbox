import React from 'react';
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {firebase_authentication} from '../authentication/FirebaseConfiguration';
// import {Firebase} from '../components/Firebase';
// import * as firebase from 'firebase/app';
// import 'firebase/auth';
// import {useAuthState} from 'react-firebase-hooks/firestore';
// import {useCollectionData} from 'react-firebase-hooks/firestore';

export const SignIn = () => {
    const SignInWithGoogle = ()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(firebase_authentication, provider)
    }
    return (
        <div>
            SignIn
            <>    </>
            <button onClick={SignInWithGoogle}>
                    SignIn
            </button>
        </div>
    )
}
