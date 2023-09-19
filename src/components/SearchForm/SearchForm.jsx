import React, { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useLocation } from "react-router-dom";

function SearchForm({ onSearchSubmit, movieErrText, checkboxChange }) {
  const [searchText, setSearchText] = useState("");

  const location = useLocation();
  const path = location.pathname;
  const isNotSavedMovies = path !== "/saved-movies";

  
  useEffect(() => {
    if (isNotSavedMovies) {
      if (localStorage.getItem("SearchText")) {
        setSearchText(localStorage.getItem("SearchText"));
      }
    }
  }, [isNotSavedMovies]);

  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }
  function sumbitSearch(e) {
    e.preventDefault();
    onSearchSubmit(searchText);
  }

  return (
    <section aria-label="search" className="search">
      <form className="search__form" onSubmit={sumbitSearch}>
        <input
          type="text"
          className="search__form-input"
          name="search-input"
          id="search-input"
          placeholder="Фильм"
          value={searchText || ""}
          onChange={handleSearchChange}
        />
        <button type="submit" className="search__form-submit">
          Найти
        </button>
      </form>
      <div className="search__form-filter">
        <label className="search__filter-name">
          <FilterCheckbox checkboxChange={checkboxChange} />
          Короткометражки
        </label>
      </div>
      <p className="search__form-error">{movieErrText}</p>
    </section>
  );
}

export default SearchForm;
