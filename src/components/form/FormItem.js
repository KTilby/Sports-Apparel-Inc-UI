import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, label, placeholder, readonly, type
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        <input
          className={styles.input}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
          readOnly={readonly}
        />
      </div>
    </label>
  </div>
);

export default FormItem;
