import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

import { movies } from "../../utils/constants";

function SavedMovies() {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movies.filter((movie) => movie.saved === true)} />
    </main>
  );
}
export default SavedMovies;
