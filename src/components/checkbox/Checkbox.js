import React from 'react';
import style from './Checkbox.module.css';

// wrapper component for an html checkbox element that provides styling and a label
const Checkbox = (props) => {
  const {
    checked, name, onChange
  } = props;

  return (
    <div className={style.container}>
      <label className={style.label} htmlFor={name}>
        <input
          className={style.input}
          name={name}
          type="checkbox"
          checked={checked}
          value={name}
          id={name}
          onChange={onChange}
        />
        {name}
      </label>
    </div>
  );
};

export default Checkbox;
