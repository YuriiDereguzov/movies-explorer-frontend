import { useState, useEffect } from "react";

function FilterCheckbox({ checkboxChange }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("Shorts")) {
      setChecked(localStorage.getItem("Shorts") === "true");
    }
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
