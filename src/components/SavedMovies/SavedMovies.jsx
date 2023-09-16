import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { movies } from "../../utils/constants";

function SavedMovies({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList
          movies={movies.filter((movie) => movie.saved === true)}
        />
      </main>
      <Footer />
    </>
  );
}
export default SavedMovies;
