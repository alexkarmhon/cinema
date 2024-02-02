import { renderFilmsGalleryDefault, clearGallery } from "./filmGallery";
import { authModalOpen, authModalClose } from "./authModal";
import { header, homeBtn, libraryBtn, signOutBtn, searchInput, headerLibBtns } from "./refs";


const iconLink = document.querySelector('.icon-film');
const logoLink = document.querySelector('.logo-link');


function openHomePage() {
  clearGallery();
  homeBtn.classList.add('current');
  libraryBtn.classList.remove('current');
  header.classList.remove('header-library');
  signOutBtn.classList.add('visually-hidden');
  searchInput.classList.remove('visually-hidden');
  headerLibBtns.classList.add('visually-hidden');
  
  renderFilmsGalleryDefault();
};

function openLibraryPage() {
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
  openHomePage();
}



signOutBtn.addEventListener('click', handlerSignOutBtn);
homeBtn.addEventListener('click', openHomePage);
libraryBtn.addEventListener('click', openLibraryPage);

export { openHomePage, openLibraryPage };