import { renderFilmsGalleryDefault, clearGallery } from "./filmGallery";
import { authModalOpen, authModalClose } from "./authModal";
import { header, logotype, homeBtn, libraryBtn, signOutBtn, searchInput, headerLibBtns } from "./refs";
import { handlerSignOut } from "./database";


const iconLink = document.querySelector('.icon-film');
const logoLink = document.querySelector('.logo-link');


function openHomePage() {
  clearGallery();
  homeBtn.classList.add('current');
  libraryBtn.classList.remove('current');
  header.classList.remove('header-library');
  
  searchInput.classList.remove('visually-hidden');
  headerLibBtns.classList.add('visually-hidden');  
  renderFilmsGalleryDefault();
};

function openLibraryPage() {
  clearGallery();  
  homeBtn.classList.remove('current');
  libraryBtn.classList.add('current');
  header.classList.add('header-library');
  
  searchInput.classList.add('visually-hidden');
  headerLibBtns.classList.remove('visually-hidden');
}

function handlerMyLibraryBtn() {
  if (!header.dataset.userId) {
    authModalOpen();
    clearGallery();
  }
  if (header.dataset.userId) {
    openLibraryPage();
    // renderFilmsGalleryDefault();  
  }
}

function handlerSignOutBtn() {
  handlerSignOut();
  openHomePage();
}

function refreshPage() {
  location.reload();
}


logotype.addEventListener('click', refreshPage);
signOutBtn.addEventListener('click', handlerSignOutBtn);
homeBtn.addEventListener('click', openHomePage);
libraryBtn.addEventListener('click', handlerMyLibraryBtn);

export { handlerMyLibraryBtn, openHomePage, openLibraryPage };