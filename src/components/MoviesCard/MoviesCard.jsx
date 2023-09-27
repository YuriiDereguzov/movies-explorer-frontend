import { useLocation } from "react-router-dom";

function MoviesCard({ movie, saved, onMovieButtonCkick }) {
  const location = useLocation();
  const path = location.pathname;
  const isMovies = path === "/movies";
  const isSavedMovies = path === "/saved-movies";

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  function handleClickLike() {
    onMovieButtonCkick(movie, saved);
  }

  return (
    <div className="card">
      <a href={movie.trailerLink} target="blank" rel="noreferrer">
        <img
          src={
            isSavedMovies
              ? movie.image
              : "https://api.nomoreparties.co/" + movie.image.url
          }
          alt={"Обложка фильма " + movie.nameRU}
          className="card__image"
        />
      </a>
      <div className="card__container">
        <h3 className="card__title">{movie.nameRU}</h3>
        <button
          className={
            isMovies
              ? saved
                ? "card__button card__button_active"
                : "card__button"
              : "button"
          }
          onClick={handleClickLike}
        ></button>
      </div>
      <p className="card__duration">{`${hours}ч ${minutes}м`}</p>
    </div>
  );
}

export default MoviesCard;
