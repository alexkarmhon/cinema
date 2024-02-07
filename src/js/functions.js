import FilmsAPI from './filmsAPI';
const filmsApi = new FilmsAPI();

function parseGenresToFilm(arr, genres) {
  const newObjArr = arr.map(el => ({
    ...el,
    release_date: el.release_date.slice(0, 4),
    genre_ids: el.genre_ids.length
      ? genres.reduce(
          (acc, { id, name }) =>
            el.genre_ids.includes(+id) && acc.length < 2 ? [...acc, name] : acc,
          [],
        )
      : ['No genres'],
  }));

  return newObjArr;
}

function filterFilmByQuery(arr) {   
  return arr
    .map(async ({ film_title, film_id }) => {
      filmsApi.query = film_title;
      const { results } = await filmsApi.fetchFilmsByName();
      const filtredById = results.filter(({ id }) => id === Number(film_id));
      return filtredById;
    })
}

export { parseGenresToFilm, filterFilmByQuery };

