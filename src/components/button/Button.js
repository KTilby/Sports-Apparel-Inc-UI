import React from 'react';
import styles from './Button.module.css';

const Button = (props) => {
  const {
    onClick, children, className, isSubmit, name
  } = props;

  return (
    <button
      className={`${styles[className]}`}
      name={name}
      onClick={onClick}
      type={isSubmit ? 'submit' : 'button'}
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
