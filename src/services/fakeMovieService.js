import * as genreAPI from "./fakeGenreService";

const movies = [
  {
    id: "1a",
    title: "13B",
    genre: { id: "1b", name: "Horror" },
    numberInStock: 6,
    dailyRentalRate: 3.4,
    publishDate: "2018-2-1",
    liked: false,
  },
  {
    id: "2a",
    title: "Tiger Zinda Hai",
    genre: { id: "2b", name: "Action" },
    numberInStock: 3,
    dailyRentalRate: 2.4,
    publishDate: "2020-1-1",
    liked: false,
  },
  {
    id: "3a",
    title: "Super 30",
    genre: { id: "5b", name: "Educational" },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishDate: "2019-12-21",
    liked: false,
  },
  {
    id: "4a",
    title: "War",
    genre: { id: "2b", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 4.5,
    publishDate: "2018-10-19",
    liked: false,
  },
  {
    id: "5a",
    title: "3 idiot",
    genre: { id: "3b", name: "Comedy" },
    numberInStock: 9,
    dailyRentalRate: 1.5,
    publishDate: "2011-9-11",
    liked: false,
  },
  {
    id: "6a",
    title: "Mission Mangal",
    genre: { id: "4b", name: "Scientific" },
    numberInStock: 10,
    dailyRentalRate: 4.6,
    publishDate: "2015-11-1",
    liked: false,
  },
  {
    id: "7a",
    title: "Dhol",
    genre: { id: "3b", name: "Comedy" },
    numberInStock: 11,
    dailyRentalRate: 3.9,
    publishDate: "2020-9-12",
    liked: false,
  },
  {
    id: "8a",
    title: "Bhootnath",
    genre: { id: "3b", name: "Comedy" },
    numberInStock: 12,
    dailyRentalRate: 4.4,
    publishDate: "2018-2-11",
    liked: false,
  },
  {
    id: "9a",
    title: "Ek Tha Tiger",
    genre: { id: "2b", name: "Action" },
    numberInStock: 6,
    dailyRentalRate: 3.3,
    publishDate: "2017-9-1",
    liked: false,
  },
];

export function getMovies() {
  return movies;
}

export function getMovie(id) {
  return movies.find((movie) => movie.id === id);
}

export function saveMovie(movie) {
  let movieInDb = movies.find((m) => m.id === movie.id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genreAPI.genres.find((g) => g.id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb.id) {
    movieInDb.id = Date.now().toString();
    movies.push(movieInDb);
  }

  return movieInDb;
}
