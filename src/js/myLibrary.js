import FilmsAPI from './filmsAPI';
import movieCardTemplate from '../templates/movie-card.hbs';
import { renderFilmsGalleryByQuery, clearGallery } from './filmGallery';
import { header, headerLibBtns, filmList, watchedBtn, queueBtn } from './refs';
import { getWatchedList, getQueuedList } from './database';
import { parseGenresToFilm, filterFilmByQuery } from './functions';

const filmsApi = new FilmsAPI();

async function handlerWatched() {
  try {
    const list = await getWatchedList();
    const watchedList = list.map(el => JSON.parse(el));
    const films = filterFilmByQuery(watchedList);

    const responses = await Promise.allSettled(films);
    const watchedGallaryList = responses
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value[0]);

    const genres = await filmsApi.fetchGenres();
    const parsedCards = parseGenresToFilm(watchedGallaryList, genres);
    filmList.insertAdjacentHTML('beforeend', movieCardTemplate(parsedCards));
  } catch (error) {
    console.log(error);
  }
}

async function handlerQueued() {
  try {
    const list = await getQueuedList();
    const queuedList = list.map(el => JSON.parse(el));
    const films = filterFilmByQuery(queuedList);

    const responses = await Promise.allSettled(films);
    const queuedGallaryList = responses
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value[0]);

    const genres = await filmsApi.fetchGenres();
    const parsedCards = parseGenresToFilm(queuedGallaryList, genres);
    filmList.insertAdjacentHTML('beforeend', movieCardTemplate(parsedCards));
  } catch (error) {
    console.log(error);
  }
}

function handlerLibsBtns(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  if (e.target.dataset.type === 'watched') {
    queueBtn.classList.remove('active');
    watchedBtn.classList.add('active');
    clearGallery();
    handlerWatched();
  }
  if (e.target.dataset.type === 'queued') {
    watchedBtn.classList.remove('active');
    queueBtn.classList.add('active');
    clearGallery();
    handlerQueued();
  }
}

headerLibBtns.addEventListener('click', handlerLibsBtns);

export { handlerQueued, handlerWatched };
