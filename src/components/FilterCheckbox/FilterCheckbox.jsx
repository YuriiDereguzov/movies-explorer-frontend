import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

function FilterCheckbox({ checkboxChange }) {
  const [checked, setChecked] = useState(true);

  // const location = useLocation();
  // const path = location.pathname;
  // const isNotSavedMovies = path !== "/saved-movies";

  useEffect(() => {
    // if (isNotSavedMovies) {
    if (localStorage.getItem("Shorts")) {
      setChecked(localStorage.getItem("Shorts") === "true");
    }
    // }
    // }, [isNotSavedMovies]);
  }, []);

  const handleChange = () => {
    checkboxChange(!checked);
    setChecked((checked) => !checked);
  };

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        name="checkbox"
        id="checkbox"
        checked={checked}
        onChange={handleChange}
      ></input>
      <div className="checkbox__button">
        <div className="checkbox__button-toggler"></div>
      </div>
    </div>
  );
}
export default FilterCheckbox;
