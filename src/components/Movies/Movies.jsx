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
        />
      </main>
      <Footer />
    </>
  );
}
export default Movies;
