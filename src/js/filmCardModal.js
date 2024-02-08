import FilmsAPI from './filmsAPI';
import movieCardTemplate from '../templates/movie-modal.hbs';
import trailerModalTemplate from '../templates/movie-trailer-modal.hbs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/src/styles/main.scss';

import { clearGallery } from './filmGallery';
import { parseGenresToFilm } from './functions';
import { handlerWatched, handlerQueued } from './myLibrary';
import { header, watchedBtn, queueBtn, libraryBtn } from './refs';
import { addToWatchedList, removeFromWatchedList, addToQueuedList, removeFromQueuedList } from './database';
import { notAuthMsg } from './pnotifyMessages';

const filmsAPI = new FilmsAPI();
let isTrailerModalOpen = false;

async function showFilmModal(e) {
  const isCard = e.target.nodeName === "IMG";
  const isAuth = header.dataset.userId !== '';
  


  if (!isCard) return;
  const value = e.target.attributes.alt.value;

  filmsAPI.query = value;

  const { results: film } = await filmsAPI.fetchFilmsByName();
  const genres = await filmsAPI.fetchGenres();
  const parsedCards = parseGenresToFilm(film, genres);

  const filmModal = basicLightbox.create(movieCardTemplate(parsedCards[0]), {
    onShow() {
      document.addEventListener("keydown", closeModal);
    },
    onClose() {
      document.removeEventListener("keydown", closeModal);
    },
  });
 
  filmModal.show();

  const addRemoveWatched = document.querySelector('#add-remove-watched-btn');
  const addRemoveQueue = document.querySelector('#add-remove-queue-btn');

  if (isAuth && watchedBtn.classList.contains('active') && libraryBtn.classList.contains('current')) {
    addRemoveWatched.dataset.action = "remove";
    addRemoveWatched.textContent = "remove from watched";
  }

  if (isAuth && queueBtn.classList.contains('active') && libraryBtn.classList.contains('current')) {
    addRemoveQueue.dataset.action = "remove";
    addRemoveQueue.textContent = "remove from queue"
  }

  document.querySelector('.movie-modal__buttons')
    .addEventListener('click', handlerMovieModalBtns);
  
  document
    .querySelector('button.movie-modal__btn-close')
    .addEventListener('click', filmModal.close);
  
  function closeModal(e) {
      if (!isTrailerModalOpen && e.code === "Escape") {
        filmModal.close();
      }
  }

  async function handlerMovieModalBtns(e) {
    const filmId = e.target.parentElement.dataset.filmId;
    const filmTitle = e.target.parentElement.dataset.filmTitle;
    const filmObj = JSON.stringify({ film_id: filmId, film_title: filmTitle });
    const user = header.dataset.userId;
  
    if (e.target.nodeName !== "BUTTON") return;
  
    if (e.target.dataset.type === 'watchedMovies' && e.target.dataset.action === 'add') {
      if (!user) {
        notAuthMsg();
        return;
      }
      addToWatchedList(filmObj);
      console.log("Added to watched")
    }
  
    if (e.target.dataset.type === 'queuedMovies' && e.target.dataset.action === 'add') {
      if (!user) {
        notAuthMsg();
        return;
      }
      addToQueuedList(filmObj);
      console.log("Added to queued")
    }
  
    if (e.target.dataset.type === 'watchedMovies' && e.target.dataset.action === 'remove') {
      await removeFromWatchedList(filmObj);
      clearGallery();
      handlerWatched();
      filmModal.close();
      console.log("Removed from watched")
    }
  
    if (e.target.dataset.type === 'queuedMovies' && e.target.dataset.action === 'remove') {
      await removeFromQueuedList(filmObj);
      clearGallery();
      handlerQueued();
      filmModal.close();
      console.log("Removed from queued")
    }
  
    if (e.target.dataset.action === 'show-trailer') {
      showTrailer(e);
    }
  }
}

async function showTrailer(e) {
  const filmId = e.target.dataset.id;

  const { results: movies } = await filmsAPI.fetchFilmsById(filmId);
  const trailer = movies.find((movie) => movie.name.includes("Trailer"));

  const trailerModal = basicLightbox.create(trailerModalTemplate(trailer), {
    onShow() {
      isTrailerModalOpen = true;
      document.addEventListener("keydown", closeModal);
    },
    onClose() {
      document.removeEventListener("keydown", closeModal);
    },
  });
  trailerModal.show();

  function closeModal(e) {
    if (e.code === "Escape") {
      isTrailerModalOpen = false;
      trailerModal.close();
    }
  }

  document
    .querySelector(".js-trailer-modal-close")
    .addEventListener("click", trailerModal.close);
}

export { showFilmModal };
