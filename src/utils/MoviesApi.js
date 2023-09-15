const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getMovies = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET'})
  .then(getResponse);
};