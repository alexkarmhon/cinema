import { initializeApp } from 'firebase/app';
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

const firebaseConfig = {
  apiKey: "AIzaSyAtey98evkx_VimmclCBlYzq03RWcFETiE",
  authDomain: "my-own-cinemateka.firebaseapp.com",
  projectId: "my-own-cinemateka",
  storageBucket: "my-own-cinemateka.appspot.com",
  messagingSenderId: "295302701129",
  appId: "1:295302701129:web:e9ac56ca8880af3592df98",
  measurementId: "G-QD2YBV8H0J"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

// Creating Load More btn for My Library 
const loadMoreBtnMyLib = new LoadMoreBtn({
  selector: '#load-more-btn',
  hidden: true,
});

// Fetching and renderin films from database (watching/queded)

// Adding movie to database
async function addMovieToDB(userId, movieListType, movie) {
  await push(ref(database, `users/${userId}/${movieListType}`), movie);
}