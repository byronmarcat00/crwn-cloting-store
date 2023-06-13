import {initializeApp} from 'firebase/app'

import {getAuth,
    signInWithRedirect
    , signInWithPopup
    ,GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
  
  }
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

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt:'select_account'
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = ()=> signInWithPopup(auth,googleProvider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth,additionalInformation ={}) =>{

    if(!userAuth) return;
    const userDocRef= doc(db,'Users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth;
      const createAt= new Date();


      try {
        await setDoc(userDocRef,{
          displayName,
          email,
          createAt,
          ...additionalInformation
        })
      }
      catch (error){
        console.log('error creating the user', error.message)

      }
    }

    return userDocRef;

    
  };

  export const createAuthUserWithEmailAndPassword = async (email,password) => {

    if(!email || !password ){return;}
    
    return await createUserWithEmailAndPassword(auth,email,password)

  }

  export const signInAuthUserWithEmailAndPassword = async (email,password) => {

    if(!email || !password ){return;}
    
    return await signInWithEmailAndPassword(auth,email,password)

  }