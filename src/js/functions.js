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

export { parseGenresToFilm };