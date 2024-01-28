const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "2c427feded2caae0e1aa5b84b18ff5a9";
const END_POINT = "trending/movie/day";
const SEARCH_END_POINT = 'search/movie';
const GENRES_END_POINT = 'genre/movie/list';

export default class FilmsAPI {
  constructor() { 
    this.page = 1;
    this.searchQuery = ''
  }

  async fetchFilms() {
    const response = await fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${this.page}`);
    const data = await response.json();
   
    return data;
  }

  async fetchGenres() {
    const response = await fetch(`${BASE_URL}${GENRES_END_POINT}?api_key=${API_KEY}`);
    const {genres} = await response.json();
    
    return genres;
  }

  async fetchFilmsByName() {
    const response = await fetch(`${BASE_URL}${SEARCH_END_POINT}?api_key=${API_KEY}&query=${this.query}`);
    const data = await response.json();
   
    return data;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
