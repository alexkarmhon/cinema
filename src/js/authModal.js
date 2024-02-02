import { handlerHomeBtn } from "./header";

const modalAuth = document.querySelector('#auth-modal-backdrop');
const modalCloseBtn = document.querySelector('#auth-modal-close-btn');
const header = document.querySelector('.header');

function authModalOpen() {
  modalAuth.classList.remove('is-hidden');
  modalCloseBtn.addEventListener('click', authModalClose);
  document.addEventListener("keydown", onEscPres);
}

function authModalClose() {
  modalAuth.classList.add('is-hidden');
  header.classList.remove('header-library');
  modalCloseBtn.removeEventListener('click', authModalClose);
  document.removeEventListener('keydown', onEscPres);
  handlerHomeBtn();
}

function onEscPres(e) {
  if(e.code === "Escape") authModalClose();
}

export { authModalOpen, authModalClose };