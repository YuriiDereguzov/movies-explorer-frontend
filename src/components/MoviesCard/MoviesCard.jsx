import { useLocation } from "react-router-dom";

function MoviesCard(props) {
  const location = useLocation();
  const path = location.pathname;
  const isMovies = path === "/movies";

  function handleClickLike() {
    console.log("click");
  }

  return (
    <div className="card">
      <img
        src={props.img}
        alt={"Обложка фильма " + props.name}
        className="card__image"
      ></img>
      <div className="card__container">
        <h3 className="card__title">{props.name}</h3>
        <button
          className={
            isMovies
              ? props.saved === false
                ? "card__button"
                : "card__button card__button_active"
              : "button"
          }
          onClick={handleClickLike}
        ></button>
      </div>
      <p className="card__duration">{props.duration}</p>
    </div>
  );
}

export default MoviesCard;
