import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItemDropdown
 * @description Input field
 * @return component
 */
const FormItemDropdown = ({
  onChange, value, id, label, options
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          className={styles.input}
          id={id}
          onChange={onChange}
          value={value}
        >
          <option value="">Select a State</option>
          {Object.entries(options).map(([optionKey, optionValue]) => (
            <option
              value={optionKey}
              key={optionKey}
            >
              {optionValue}
            </option>
          ))}
        </select>
      </div>
    </label>
  </div>
);

export default FormItemDropdown;
