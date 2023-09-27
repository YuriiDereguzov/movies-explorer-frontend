import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  movies,
  isMoviesLoading,
  saved,
  savedMovies,
  onMovieButtonCkick,
  moreMoviesButton,
  handleClickMoreMovies,
}) {
  function isMovieSaved(movie) {
    return savedMovies.some((savedMovie) => savedMovie.movieId === movie.id);
  }

  return (
    <section className="cards">
      {isMoviesLoading === true ? (
        <Preloader />
      ) : (
        <div className="cards__list">
          {movies.map((data) => (
            <MoviesCard
              movie={data}
              key={data.id || data._id}
              saved={saved || isMovieSaved(data)}
              onMovieButtonCkick={onMovieButtonCkick}
            />
          ))}
        </div>
      )}
      {moreMoviesButton ? (
        <button className="cards__button" onClick={handleClickMoreMovies}>
          Ещё
        </button>
      ) : (
        <></>
      )}
    </section>
  );
}
export default MoviesCardList;
