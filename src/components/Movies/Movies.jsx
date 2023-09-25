import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies({
  loggedIn,
  handleSearchSumbit,
  movies,
  movieErrText,
  isMoviesLoading,
  checkboxChange,
  onMovieButtonCkick,
  savedMovies,
  moreMoviesButton,
  handleClickMoreMovies,
}) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm
          onSearchSubmit={handleSearchSumbit}
          checkboxChange={checkboxChange}
          movieErrText={movieErrText}
        />
        <MoviesCardList
          movies={movies}
          isMoviesLoading={isMoviesLoading}
          onMovieButtonCkick={onMovieButtonCkick}
          savedMovies={savedMovies}
          moreMoviesButton={moreMoviesButton}
          handleClickMoreMovies={handleClickMoreMovies}
        />
      </main>
      <Footer />
    </>
  );
}
export default Movies;
