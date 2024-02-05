import FilmsAPI from './filmsAPI';
import { parseGenresToFilm } from './functions';
import movieCardTemplate from '../templates/movie-modal.hbs';
import trailerModalTemplate from '../templates/movie-trailer-modal.hbs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/src/styles/main.scss';

const filmsAPI = new FilmsAPI();
let isTrailerModalOpen = false;

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

async function showFilmModal(e) {
  const isCard = e.target.nodeName === "IMG";

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
  
  document
    .querySelector("button.movie-modal__btn-close")
    .addEventListener("click", filmModal.close);

  document
    .querySelector('button[data-action="show-trailer"]')
    .addEventListener("click", showTrailer);
  
  document
    .querySelector('button[data-type="watchedMovies"]')
    .addEventListener('click', handlerAddRemoveWatchedBtn);
  
  function closeModal(e) {
      if (!isTrailerModalOpen && e.code === "Escape") {
        filmModal.close();
      }
    }
}

function handlerAddRemoveWatchedBtn(e) {
  console.dir(e.target.parentElement.dataset);
  const filmId = e.target.parentElement.dataset.filmId;
  const filmTitle = e.target.parentElement.dataset.filmTitle;
  console.log(filmId, filmTitle)
}


export { showFilmModal };
