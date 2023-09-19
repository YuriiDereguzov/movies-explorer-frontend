import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({ movies, isMoviesLoading }) {
  const [countMovies, setCountMovies] = useState(16);

  function handleClickMoreMovies() {
    setCountMovies(countMovies + 16);
  }

  return (
    <section className="cards">
      {isMoviesLoading === true ? (
        <Preloader />
      ) : (
        <div className="cards__list">
          {movies.slice(0, countMovies).map((data) => (
            <MoviesCard movie={data} key={data.id} />
          ))}
        </div>
      )}
      {countMovies < movies.length && (
        <button className="cards__button" onClick={handleClickMoreMovies}>
          Ещё
        </button>
      )}
    </section>
  );
}
export default MoviesCardList;
