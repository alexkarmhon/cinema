import FilmsAPI from './filmsAPI';
import { parseGenresToFilm } from './functions';
import movieCardTemplate from '../templates/movie-modal.hbs';
import trailerModalTemplate from '../templates/movie-trailer-modal.hbs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/src/styles/main.scss';

const filmsAPI = new FilmsAPI();

async function showTrailer(e) {
  const filmId = e.target.dataset.id;
  const { results: movies } = await filmsAPI.fetchFilmsById(filmId);
  const trailer = movies.find(
    movie => movie.name === 'Official Trailer',
  );
  console.log(trailer);

  const trailerModal = basicLightbox.create(
    trailerModalTemplate(trailer),
  );
  trailerModal.show();

  document
    .querySelector('.js-trailer-modal-close')
    .addEventListener('click', trailerModal.close);

  // document.addEventListener(
  //   'keydown',
  //   e => {
  //     if (e.code !== 'Escape') return;
  //     // trailerModal.close();
  //     console.log(e.currentTarget)
  //   },
  //   // { once: true },
  // );
}

async function showFilmModal(e) {
  const isCard = e.target.nodeName === 'IMG';

  if (!isCard) return;
  const value = e.target.attributes.alt.value;

  filmsAPI.query = value;

  const { results: film } = await filmsAPI.fetchFilmsByName();
  const genres = await filmsAPI.fetchGenres();
  const parsedCards = parseGenresToFilm(film, genres);

  const filmModal = basicLightbox.create(movieCardTemplate(parsedCards[0]));
  filmModal.show();

  document
    .querySelector('.js-movie-modal-close')
    .addEventListener('click', filmModal.close);
  
  document
    .querySelector('button[data-action="show-trailer"]')
    .addEventListener('click', showTrailer);

  document.addEventListener(
    'keydown',
    e => {
      if (e.code !== 'Escape') return;
      console.log(e.target)
      filmModal.close();
    },
    { once: true },
  );
}

export { showFilmModal };
