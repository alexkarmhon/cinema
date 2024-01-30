import FilmsAPI from './filmsAPI';
import { parseGenresToFilm } from './functions';
import movieCardTemplate from '../templates/movie-modal.hbs';
import * as basicLightbox from 'basiclightbox';
import '../../node_modules/basiclightbox/src/styles/main.scss';

const filmsAPI = new FilmsAPI();

async function showFilmModal(e) {
  const isCard = e.target.nodeName === 'IMG';

  if (!isCard) return;
  const value = e.target.attributes.alt.value;

  filmsAPI.query = value;

  const { results: film } = await filmsAPI.fetchFilmsByName();
  const genres = await filmsAPI.fetchGenres();
  const parsedCards = parseGenresToFilm(film, genres);

  const {
    genre_ids,
    original_language,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    vote_average,
    vote_count,
  } = parsedCards[0];

  const instance = basicLightbox.create(movieCardTemplate(parsedCards[0]));
  instance.show();
  document.querySelector('.js-modal-close').addEventListener('click', instance.close);
  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Escape') return;
    instance.close();
  }, { once: true });
}

export { showFilmModal };
