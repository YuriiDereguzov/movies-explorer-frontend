import { useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const [countMovies, setCountMovies] = useState(16);

  function handleClickMoreMovies() {
    setCountMovies(countMovies + 16);
  }

  return (
    <section className="cards">
      <div className="cards__list">
        {props.movies.slice(0, countMovies).map((data, i) => (
          <MoviesCard
            key={i}
            name={data.name}
            duration={data.duration}
            img={data.img}
            saved={data.saved}
          />
        ))}
      </div>
      {countMovies < props.movies.length && (
        <button className="cards__button" onClick={handleClickMoreMovies}>
          Ещё
        </button>
      )}
    </section>
  );
}
export default MoviesCardList;
