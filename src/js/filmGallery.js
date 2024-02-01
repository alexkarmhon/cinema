import FilmsAPI from './filmsAPI';
import movieCardTemplate from '../templates/movie-card.hbs';
import LoadMoreBtn from './load-more-btn';
import { errorMsg, emptyMovie } from './pnotify';
import { showFilmModal } from './filmCardModal';
import { parseGenresToFilm } from './functions';

const filmList = document.querySelector('#film-list');
const moreFilmsBtn = document.querySelector('#load-more-btn');
const searchFormInput = document.querySelector('#search-form');

const filmsAPI = new FilmsAPI();
const loadMoreBtn = new LoadMoreBtn({
  selector: '#load-more-btn',
  hidden: true,
});



async function renderFilmsGalleryDefault() {
  try {
    const { results: films, total_results } = await filmsAPI.fetchFilms();
    const genres = await filmsAPI.fetchGenres();
    const parsedCards = parseGenresToFilm(films, genres);
  
    filmList.insertAdjacentHTML('beforeend', movieCardTemplate(parsedCards));
  
    if (films.length * filmsAPI.page >= total_results || filmsAPI.page >= 500) {
      loadMoreBtn.hide();
      return;
    }
  
    loadMoreBtn.enable();
    loadMoreBtn.show();
  } catch {
    loadMoreBtn.hide();
    errorMsg();
  }
 
}

async function renderFilmsGalleryByQuery() {
  try {
    const { results: films, total_results } = await filmsAPI.fetchFilmsByName();

    if (!filmsAPI.query || films.length === 0) {
      emptyMovie();
    }

    const genres = await filmsAPI.fetchGenres();
    const parsedCards = parseGenresToFilm(films, genres);

    filmList.insertAdjacentHTML('beforeend', movieCardTemplate(parsedCards));

    if (films.length * filmsAPI.page >= total_results || filmsAPI.page >= 500) {
      loadMoreBtn.hide();
      return;
    }
  } catch {
    loadMoreBtn.hide();
    errorMsg();
  }
}

function clearGallery() {
  filmList.innerHTML = '';
  searchFormInput.reset();
  loadMoreBtn.hide();
}

function handlerMoreFilmsBtn() {
  loadMoreBtn.disable();
  filmsAPI.incrementPage();
  renderFilmsGallery();
}

async function handlerFormInput(e) {
  e.preventDefault();
  loadMoreBtn.disable();

  const value = e.target.elements.query.value;

  filmsAPI.query = value;

  clearGallery();
  
  renderFilmsGalleryByQuery();

  loadMoreBtn.enable();
  loadMoreBtn.show();
}

renderFilmsGalleryDefault();
searchFormInput.addEventListener('submit', handlerFormInput);
moreFilmsBtn.addEventListener('click', handlerMoreFilmsBtn);
filmList.addEventListener('click', showFilmModal);


export { renderFilmsGalleryDefault, clearGallery };