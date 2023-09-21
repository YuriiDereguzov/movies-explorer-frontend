import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  movies,
  isMoviesLoading,
  saved,
  savedMovies,
  onMovieButtonCkick,
}) {
  const [moreMovies, setMoremuvies] = useState(2);
  const [moviesAmount, setMoviesAmount] = useState(5);

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    // setTimeout(() => {
    //   window.addEventListener("resize", resize);
    //   resize();
    // }, 100);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function resize() {
    if (window.innerWidth > 1025) {
      setMoremuvies(4);
      setMoviesAmount(16);
    } else if (window.innerWidth > 768) {
      setMoremuvies(3);
      setMoviesAmount(9);
    } else if (window.innerWidth > 500) {
      setMoremuvies(2);
      setMoviesAmount(8);
    } else {
      setMoviesAmount(5);
    }
  }

  function handleClickMoreMovies() {
    setMoviesAmount(moviesAmount + moreMovies);
  }

  function isMovieSaved(movie) {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  }

  return (
    <section className="cards">
      {isMoviesLoading === true ? (
        <Preloader />
      ) : (
        <div className="cards__list">
          {movies.slice(0, moviesAmount).map((data, i) => (
            <MoviesCard
              movie={data}
              key={i}
              saved={saved || isMovieSaved(data)}
              onMovieButtonCkick={onMovieButtonCkick}
            />
          ))}
        </div>
      )}
      {moviesAmount < movies.length && (
        <button className="cards__button" onClick={handleClickMoreMovies}>
          Ещё
        </button>
      )}
    </section>
  );
}
export default MoviesCardList;
