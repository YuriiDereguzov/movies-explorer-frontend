import React, { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({ props }) {
  const [searchText, setSearchText] = useState("");

  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }
  function sumbitSearch(e) {
    e.preventDefault();
    props.onSearchSubmit(searchText);
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
          required
        />
        <button type="submit" className="search__form-submit">
          Найти
        </button>
      </form>
      <div className="search__form-filter">
        <label className="filter__name">
          {/* <FilterCheckbox checkboxChange={props.checkboxChange} /> */}
          <FilterCheckbox />
          Короткометражки
        </label>
      </div>
    </section>
  );
}

export default SearchForm;
