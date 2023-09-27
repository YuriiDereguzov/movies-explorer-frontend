import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies({
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
          onMovieButtonCkick={onMovieButtonCkick}
          saved={true}
          movies={movies}
          savedMovies={savedMovies}
          isMoviesLoading={isMoviesLoading}
        />
      </main>
      <Footer />
    </>
  );
}
export default SavedMovies;
