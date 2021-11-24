import http from "./httpService";
import { apiUrl } from "../config.json";

export function getMovies() {
  return http.get(`${apiUrl}/movies`);
}

export function deleteMovie(movieId) {
  return http.delete(`${apiUrl}/movies/${movieId}`);
}

export function getMovie(id) {
  return http.get(`${apiUrl}/movies/${id}`);
}

export async function saveMovie(movie) {
  if (movie.id) {
    const body = { ...movie };
    delete body.id;
    return http.put(`${apiUrl}/movies/${movie.id}`, body);
  }

  return http.post(`${apiUrl}/movies`, movie);
}
