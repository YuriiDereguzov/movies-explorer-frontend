// import { useState } from 'react';

function FilterCheckbox(props) {
  //   const [checked, setChecked] = useState(true);

  //   const handleChange = () => {
  //     props.checkboxChange(!checked);
  //     setChecked((checked) => !checked);
  //   };

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        className="checkbox__input"
        // checked={checked}
        // onChange={handleChange}
      ></input>
      <div className="checkbox__button">
        <div className="checkbox__button-toggler"></div>
      </div>
    </div>
  );
}
export default FilterCheckbox;
