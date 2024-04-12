import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import styles from './SignupInput.module.css';
import { getInputType } from '../../utils/common';
import Button from '../button/Button';

const SignupInput = ({
  label, name, onChange, type, value, error, errorMessage, tabIndex
}) => {
  const [inputType, setInputType] = useState(getInputType(type));
  const [icon, setIcon] = useState(<VisibilityOff />);

  const handleToggle = () => {
    if (inputType === 'password') {
      setIcon(<Visibility />);
      setInputType('text');
    } else {
      setIcon(<VisibilityOff />);
      setInputType('password');
    }
  };
  return (
    <div className={styles.container}>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          tabIndex={tabIndex}
          name={name}
          value={value}
          onChange={onChange}
          className={styles.input}
          type={inputType}
        />
        {name === 'password' && <Button className="viewPasswordButton" onClick={handleToggle}>{icon}</Button>}
      </div>
      <div className={styles.error}>
        {error && (
          <>
            {errorMessage}
          </>
        )}
      </div>
    </div>
  );
};

export default SignupInput;
