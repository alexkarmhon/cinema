import { renderFilmsGalleryDefault, clearGallery } from "./filmGallery";
import { authModalOpen, authModalClose } from "./authModal";


const iconLink = document.querySelector('.icon-film');
const logoLink = document.querySelector('.logo-link');
const homeBtn = document.querySelector('#home-btn');
const libraryBtn = document.querySelector('#my-lib-btn');
const header = document.querySelector('.header');
const signOutBtn = document.querySelector('#sign-out-btn');
const searchInput = document.querySelector('.form-wrapper');
const headerLibBtns = document.querySelector('#h-lib-btns')




function handlerHomeBtn() {
  clearGallery();
  homeBtn.classList.add('current');
  libraryBtn.classList.remove('current');
  header.classList.remove('header-library');
  signOutBtn.classList.add('visually-hidden');
  searchInput.classList.remove('visually-hidden');
  headerLibBtns.classList.add('visually-hidden');
  
  renderFilmsGalleryDefault();
};

function handlerLibraryBtn() {
  clearGallery();
  
  homeBtn.classList.remove('current');
  libraryBtn.classList.add('current');
  header.classList.add('header-library');
  signOutBtn.classList.remove('visually-hidden');
  searchInput.classList.add('visually-hidden');
  headerLibBtns.classList.remove('visually-hidden');
  authModalOpen();
}

function handlerSignOutBtn() {
  handlerHomeBtn();
}



signOutBtn.addEventListener('click', handlerSignOutBtn);
homeBtn.addEventListener('click', handlerHomeBtn);
libraryBtn.addEventListener('click', handlerLibraryBtn);

export { handlerLibraryBtn, handlerHomeBtn };