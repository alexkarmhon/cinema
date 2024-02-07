import { openHomePage } from './header';
import {
  header,
  modalAuth,
  modalCloseBtn,
  modalSignInBtn,
  signInForm,
  registrationBtn,
  modalReg,
  regForm,
  regCloseBtn,
} from './refs';

import { hadlerRegistration, handlerSignIn } from './database';

import { renderFilmsGalleryDefault } from './filmGallery';

function authModalOpen() {
  modalAuth.classList.remove('is-hidden');
  modalCloseBtn.addEventListener('click', authModalClose);
  registrationBtn.addEventListener('click', registrationModalOpen);
  document.addEventListener('keydown', handlerEscPres);
  document.addEventListener('click', handlerBackdropClick);
  signInForm.addEventListener('submit', handlerSignIn);
}

function authModalClose() {
  modalAuth.classList.add('is-hidden');
  modalCloseBtn.removeEventListener('click', authModalClose);
  document.removeEventListener('keydown', handlerEscPres);
  document.addEventListener('click', handlerBackdropClick);
  renderFilmsGalleryDefault();
}

function registrationModalOpen() { 
  modalReg.classList.remove('is-hidden');
  regCloseBtn.addEventListener('click', registrationModalClose);
  regForm.addEventListener('submit', hadlerRegistration);
}

function registrationModalClose() { 
  modalReg.classList.add('is-hidden');
  regCloseBtn.removeEventListener('click', registrationModalClose);
}

function handlerEscPres(e) {
  if (e.code === 'Escape' && !modalReg.classList.contains('is-hidden')) {
    registrationModalClose();
    return;
  };

  if (e.code === 'Escape' && modalReg.classList.contains('is-hidden')) {
    authModalClose();
    openHomePage();
  }
}

function handlerBackdropClick(e) {
  if (e.target.classList.contains('backdrop') && !modalReg.classList.contains('is-hidden')) {
    registrationModalClose();
    return;
  }

  if (e.target.classList.contains('backdrop') && !modalAuth.classList.contains('is-hidden')) {
    authModalClose();
    openHomePage();
  }

}
 


export { authModalOpen, authModalClose, registrationModalOpen, registrationModalClose };
