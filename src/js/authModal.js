import { openHomePage } from './header';
import {
  header,
  modalAuth,
  modalCloseBtn,
  modalSignInBtn,
  registrationBtn,
  modalReg,
  regCloseBtn,
  signUpBtn,
} from './refs';

function authModalOpen() {
  modalAuth.classList.remove('is-hidden');
  modalCloseBtn.addEventListener('click', authModalClose);
  registrationBtn.addEventListener('click', registrationModalOpen);
  document.addEventListener('keydown', handlerEscPres);
}

function authModalClose() {
  modalAuth.classList.add('is-hidden');
  header.classList.remove('header-library');
  modalCloseBtn.removeEventListener('click', authModalClose);
  document.removeEventListener('keydown', handlerEscPres);
  openHomePage();
}

function registrationModalOpen() { 
  modalReg.classList.remove('is-hidden');
  regCloseBtn.addEventListener('click', registrationModalClose);
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

  authModalClose();
}
 
// function onRegistration

export { authModalOpen, authModalClose };
