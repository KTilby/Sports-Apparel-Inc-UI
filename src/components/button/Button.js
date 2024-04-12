import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {
  const {
    onClick, children, className, disabled, isSubmit, name
  } = props;

  return (
    <button
      className={`${styles[className]}`}
      name={name}
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

// set isSubmit to false if it is not passed into component
Button.defaultProps = {
  isSubmit: false
};

export default Button;
