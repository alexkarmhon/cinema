import { defaultModules, error, info, notice, success } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import * as PNotifyMobile from '@pnotify/mobile';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
defaultModules.set(PNotifyMobile, {});

export {
  successfulRegistrationMsg,
  authErrorMsg,
  signOutMsg,
  successfulSignInMsg,
  errorMsg,
  emptyLibraryMsg,
  notEnterSearchQuery,
  registrationErrorMsg,
  emptyMovie,
  wrongRequest,
  notAuthMsg,
  addedToWathedMsg,
  addedToQueuedMsg,
  removedFromWatchedMsg,
  removedFromQueuedMsg,
  emptyWatchedMsg,
  emptyQueuedMsg
};

// const mySuccess = success({
//   text: "I'm a success message.",
// });

function successfulRegistrationMsg() {
  success({
    text: 'Thank you for joining Filmoteka!',
    delay: 2000,
  });
}

function successfulSignInMsg() {
  success({
    text: '😊 Welcome to OwnCinemateka!',
    delay: 2000,
  });
}

function signOutMsg() {
  notice({
    text: 'Goodbye!',
    delay: 2000,
  });
}

function addedToWathedMsg() {
  success({
    text: 'Added to the Watched',
    delay: 2000,
  });
}

function addedToQueuedMsg() {
  success({
    text: 'Added to the Queued',
    delay: 2000,
  });
}

function removedFromWatchedMsg() {
  success({
    text: 'Removed from the Watched',
    delay: 2000,
  });
}

function removedFromQueuedMsg() {
  success({
    text: 'Removed from the Queued',
    delay: 2000,
  });
}

function emptyLibraryMsg() {
  info({
    text: `There are no movies in your library!`,
    delay: 2000,
  });
}

function emptyWatchedMsg() {
  info({
    text: `There are no movies in your Watched!`,
    delay: 2000,
  });
}

function emptyQueuedMsg() {
  info({
    text: `There are no movies in your Queued!`,
    delay: 2000,
  });
}

function authErrorMsg() {
  error({
    text: 'Invalid e-mail or password.',
    delay: 2000,
  });
}

function registrationErrorMsg(errorMsg) {
  error({
    text: `${errorMsg}!`,
    delay: 2000,
  });
}

function errorMsg() {
  error({
    text: 'Ooops, something went wrong...',
    delay: 2000,
  });
}

function notEnterSearchQuery() {
  notice({
    text: 'Please enter your search request!',
    delay: 2000,
  });
}

function emptyMovie() {
  error({
    text: 'Enter the correct movie name!',
    delay: 2000,
  });
}

function wrongRequest() {
  error({
    text: 'Search result not successful. Enter the correct movie name!',
    delay: 2000,
  });
}

function notAuthMsg() {
  notice({
    text: 'NOT SO FAST!\nPlease SIGN IN or REGISTER to use the Movie Library!',
    delay: 2000,
  });
}
