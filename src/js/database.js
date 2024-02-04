// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  get,
  orderByKey,
  limitToFirst,
  startAfter,
  query,
  orderByChild,
  equalTo,
  remove,
} from 'firebase/database';

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { registrationModalClose, authModalClose } from "./authModal";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsfd-3fBAf5f-FVpWSftabVrr0pR9i2Nw",
  authDomain: "cinemateka-91cd3.firebaseapp.com",
  projectId: "cinemateka-91cd3",
  storageBucket: "cinemateka-91cd3.appspot.com",
  messagingSenderId: "547856263466",
  appId: "1:547856263466:web:6a175dec43543ff2171653"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
console.log(db);

// User registration
async function hadlerRegistration(e) {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  console.log(email, password);

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    
    registrationModalClose();
    console.log("Registration success")
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email adress is already in use');
    }
    if (error.code === 'auth/invalid-email') {
      console.log('That email adress is invalid')
    }
  }
}

// Sign in existing users
async function handlerSignIn(e) {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;
  
  try {
    await signInWithEmailAndPassword(auth, email, password);
    
    authModalClose();
    console.log("Welcome user")
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      console.log('Wrong email or password!');
    }
    // if (error.code === 'auth/invalid-email') {
    //   console.log('That email adress is invalid')
    // }
    console.log(error.code)
  }
}

// async function 

// Creating Load More btn for My Library 
// const loadMoreBtnMyLib = new LoadMoreBtn({
//   selector: '#load-more-btn',
//   hidden: true,
// });


// Fetching and renderin films from database (watching/queded)

// Adding movie to database
// async function addMovieToDB(userId, movieListType, movie) {
//   await push(ref(database, `users/${userId}/${movieListType}`), movie);
// }


export { hadlerRegistration, handlerSignIn };