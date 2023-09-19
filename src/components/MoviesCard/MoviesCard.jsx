// import { useLocation } from "react-router-dom";

function MoviesCard({ movie }) {
  // const location = useLocation();
  // const path = location.pathname;
  // const isMovies = path === "/movies";

  const hours = Math.floor(movie.duration / 60);
  const minutes = movie.duration % 60;

  function handleClickLike() {
    console.log("click");
  }

  return (
    <div className="card">
      <img
        src={"https://api.nomoreparties.co/" + movie.image.url}
        alt={"Обложка фильма " + movie.nameRU}
        className="card__image"
      ></img>
      <div className="card__container">
        <h3 className="card__title">{movie.nameRU}</h3>
        <button
          className={
            "card__button"
            // isMovies
            //   ? saved === false
            //     ? "card__button"
            //     : "card__button card__button_active"
            //   : "button"
          }
          onClick={handleClickLike}
        ></button>
      </div>
      <p className="card__duration">{`${hours}ч ${minutes}м`}</p>
    </div>
  );
}

export default MoviesCard;
