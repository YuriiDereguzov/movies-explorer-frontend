export const BASE_URL = "https://api.kinopoisk.nomoredomains.rocks";

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(getResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponse);
};

export const authentication = () => {
  const token = localStorage.getItem("jwt");
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
};

export const editProfile = (name, email) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  }).then(getResponse);
};

export const getMySavedMovies = () => {
  const token = localStorage.getItem("jwt");

  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
};

export const saveMovie = (Film) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      country: Film.country,
      director: Film.director,
      duration: Film.duration,
      year: Film.year,
      description: Film.description,
      image: "https://api.nomoreparties.co/" + Film.image.url,
      trailerLink: Film.trailerLink,
      thumbnail:
        "https://api.nomoreparties.co/" + Film.image.formats.thumbnail.url,
      movieId: Film.id,
      nameRU: Film.nameRU,
      nameEN: Film.nameEN,
    }),
  }).then(getResponse);
};

export const deleteMovie = (id) => {
  const token = localStorage.getItem("jwt");

  return fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
};
