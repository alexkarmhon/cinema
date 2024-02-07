// Header
const header = document.querySelector('.header');
const homeBtn = document.querySelector('#home-btn');
const libraryBtn = document.querySelector('#my-lib-btn');
const signOutBtn = document.querySelector('#sign-out-btn');
const searchInput = document.querySelector('.form-wrapper');
const headerLibBtns = document.querySelector('#h-lib-btns');
const watchedBtn = document.querySelector('#btn-watched');
const queueBtn = document.querySelector('#btn-queue');


// ThemeSwitcher
const switcher = document.querySelector('#theme-btn');
const body = document.querySelector('body');
const sun = document.querySelector('#sun');
const moon = document.querySelector('#moon');

// Film Gallery
const filmList = document.querySelector('#film-list');
const moreFilmsBtn = document.querySelector('#load-more-btn');
const searchFormInput = document.querySelector('#search-form');

// Auth Modal
const modalAuth = document.querySelector('#auth-modal-backdrop');
const modalCloseBtn = document.querySelector('#auth-modal-close-btn');
const modalSignInBtn = document.querySelector('#signin-btn');
const registrationBtn = document.querySelector('#registration-btn');
const signInForm = document.querySelector('#auth-form');

// Registration Modal
const modalReg = document.querySelector('#registration-modal-backdrop');
const regCloseBtn = document.querySelector('#registration-modal-close-btn');
const signUpBtn = document.querySelector('#signUp-btn');
const regForm = document.querySelector('#reg-form');

export { header, homeBtn, libraryBtn, signOutBtn, searchInput, headerLibBtns, watchedBtn, queueBtn };//Header
export { switcher, body, sun, moon };//Theme Switcher
export { filmList, moreFilmsBtn, searchFormInput };//Film Gallery
export { modalAuth, modalCloseBtn, modalSignInBtn, registrationBtn, signInForm };//Modal SignIn
export { modalReg, regCloseBtn, signUpBtn, regForm };//Modal Registration