const iconLink = document.querySelector('.icon-film');
const logoLink = document.querySelector('.logo-link');
const homeBtn = document.querySelector('#home-btn');
const libraryBtn = document.querySelector('#my-lib-btn');
const header = document.querySelector('.header');


function handlerHomeBtn() { 
  homeBtn.classList.add('current');
  libraryBtn.classList.remove('current');
  header.classList.remove('header-library');
};

function handlerLibraryBtn() {
  homeBtn.classList.remove('current');
  libraryBtn.classList.add('current');
  header.classList.add('header-library');
}




homeBtn.addEventListener('click', handlerHomeBtn);
libraryBtn.addEventListener('click', handlerLibraryBtn);