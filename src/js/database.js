// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  arrayUnion,
  arrayRemove,
  getFirestore,
} from 'firebase/firestore';

import {
  signOut,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  errorMsg,
  signOutMsg,
  authErrorMsg,
  successfulSignInMsg,
  registrationErrorMsg,
  successfulRegistrationMsg,
  addedToWathedMsg,
  addedToQueuedMsg,
  removedFromWatchedMsg,
  removedFromQueuedMsg,
  emptyWatchedMsg,
  emptyQueuedMsg
} from './pnotifyMessages';

import { openLibraryPage } from './header';
import { header, signOutBtn, regForm, signInForm } from './refs';
import { registrationModalClose, authModalClose } from './authModal';

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyCsfd-3fBAf5f-FVpWSftabVrr0pR9i2Nw',
//   authDomain: 'cinemateka-91cd3.firebaseapp.com',
//   databaseURL:
//     'https://cinemateka-91cd3-default-rtdb.europe-west1.firebasedatabase.app/',
//   projectId: 'cinemateka-91cd3',
//   storageBucket: 'cinemateka-91cd3.appspot.com',
//   messagingSenderId: '547856263466',
//   appId: '1:547856263466:web:6a175dec43543ff2171653',
// };

const firebaseConfig = {
  apiKey: "AIzaSyD7JTjWcT71UBKZ77FEgs5tVf1c3f-YOPo",
  authDomain: "filmsite-378c8.firebaseapp.com",
  projectId: "filmsite-378c8",
  storageBucket: "filmsite-378c8.appspot.com",
  messagingSenderId: "644034043980",
  appId: "1:644034043980:web:b3cbfe790cabe202ded4e9",
  measurementId: "G-W6LKKHPRLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const usersRef = collection(db, 'users');

async function createUserStorage(user_id, email) {
  await setDoc(doc(usersRef, user_id), {
    user_id: user_id,
    user_mail: email,
    watched: [{ film_id: '123', film_title: 'title1' }],
    queued: [{ film_id: '456', film_title: 'title3' }],
  });
}

async function addToWatchedList(obj) {
  try {
    await updateDoc(doc(db, 'users', `${header.dataset.userId}`), {
      watched: arrayUnion(obj),
    });

    addedToWathedMsg();
  } catch (error) {
    errorMsg();
    console.log(error);
  }
}

async function removeFromWatchedList(obj) {
  try {
    await updateDoc(doc(db, 'users', `${header.dataset.userId}`), {
      watched: arrayRemove(obj),
    });

    removedFromWatchedMsg();
  } catch (error) {
    errorMsg();
    console.log(error);
  }
}

async function addToQueuedList(obj) {
  try {
    await updateDoc(doc(db, 'users', `${header.dataset.userId}`), {
      queued: arrayUnion(obj),
    });

    addedToQueuedMsg();
  } catch (error) {
    errorMsg();
    console.log(error);
  }
}

async function removeFromQueuedList(obj) {
  try {
    await updateDoc(doc(db, 'users', `${header.dataset.userId}`), {
      queued: arrayRemove(obj),
    });

    removedFromQueuedMsg();
  } catch (error) {
    errorMsg();
    console.log(error);
  }
}

async function getWatchedList() {
  try {
    const response = await getDoc(doc(db, 'users', `${header.dataset.userId}`));
    const data = response.data();

    if (data.queued.length === 0) {
      emptyWatchedMsg();
      return;
    };
    
    return data.watched;
  } catch (error) {
    errorMsg();
    console.log(error);
  }
}

async function getQueuedList() {
  try {
    const response = await getDoc(doc(db, 'users', `${header.dataset.userId}`));
    const data = response.data();

    if (data.queued.length === 0) {
      emptyQueuedMsg();
      return;
    };

    return data.queued;
  } catch (error) {
    errorMsg();
    console.log(error);
  }
}

// User registration
async function hadlerRegistration(e) {
  e.preventDefault();

  const email = e.currentTarget.elements.email.value;
  const password = e.currentTarget.elements.password.value;

  try {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);

    createUserStorage(newUser.user.uid, email);
    console.log('Registration success');
    console.log(newUser);
    regForm.reset();
    registrationModalClose();
    successfulRegistrationMsg();
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      registrationErrorMsg('That email adress is already in use');
      return;
    }
    if (error.code === 'auth/invalid-email') {
      registrationErrorMsg('That email adress is invalid');
      return;
    }
    errorMsg();
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
    signInForm.reset();
    openLibraryPage();

    onAuthStateChanged();
  } catch (error) {
    if (error.code === 'auth/invalid-credential') {
      console.log('Wrong email or password!');
      console.log(error.code);
      authErrorMsg();
    }
  }
}

onAuthStateChanged(auth, user => {
  if (user) {
    successfulSignInMsg();
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log('Welcome user', uid);
    // ...
    header.dataset.userId = uid;
    signOutBtn.classList.remove('visually-hidden');
  } else {
    // User is signed out
    // ...
    signOutBtn.classList.add('visually-hidden');
    header.dataset.userId = '';
  }
});

async function handlerSignOut() {
  await signOut(auth);
  signOutMsg();
}

export {
  hadlerRegistration,
  handlerSignIn,
  handlerSignOut,
  onAuthStateChanged,
  addToWatchedList,
  removeFromWatchedList,
  addToQueuedList,
  removeFromQueuedList,
  getWatchedList,
  getQueuedList,
};
