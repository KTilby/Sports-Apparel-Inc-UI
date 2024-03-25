import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {
  const {
    onClick, children, className
  } = props;

  return (
    <button
      className={`${styles[className]}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Button;
