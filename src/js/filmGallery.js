import FilmsAPI from "./filmsAPI";
import movieCardTemplate from '../templates/movie-card.hbs'

const filmList = document.querySelector('#film-list');


const filmsAPI = new FilmsAPI();

function parseGenresToFilm(arr, genres) {
  const newObjArr = arr.map(el => ({
    ...el,
    genre_ids: el.genre_ids.length ? [...genres.reduce((acc, { id, name }) => (el.genre_ids.includes(+id)?[...acc,name] : acc), []).slice(0,2)] : ['No genres'],
  }));

  console.log(newObjArr);
  return newObjArr;
}

async function renderGallery() {
  const { results: films } = await filmsAPI.getFilms();
  const genres = await filmsAPI.getGenres();
  const parsedCards = parseGenresToFilm(films, genres);
  
  filmList.insertAdjacentHTML('beforeend', movieCardTemplate(parsedCards));
}

renderGallery()