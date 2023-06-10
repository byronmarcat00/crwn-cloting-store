import {initializeApp} from 'firebase/app'

import {getAuth,
    signInWithRedirect
    , signInWithPopup
    ,GoogleAuthProvider}
     from "firebase/auth";


import {getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyCN2DMq6n9RCMULj0H7qLW_Yb9B0bfWN1o",
    authDomain: "crwn-clothing-db-5a1a8.firebaseapp.com",
    projectId: "crwn-clothing-db-5a1a8",
    storageBucket: "crwn-clothing-db-5a1a8.appspot.com",
    messagingSenderId: "43744893370",
    appId: "1:43744893370:web:d98f386d9277690e086583"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt:'select_account'
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider)

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) =>{

    const userDocRef= doc(db,'Users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createAt= new Date();

      try {
        await setDoc(userDocRef,{
          displayName,
          email,
          createAt
        })
      }
      catch (error){
        console.log('error creating the user', error.message)

      }
    }

    return userDocRef;

    
  }