import React, { useState } from 'react';
import {
  EmailOutlined, Visibility, VisibilityOff, VpnKey
} from '@material-ui/icons';
import Button from '../button/Button';
import styles from './input.module.css';

/**
 * Wrapper for HTML input
 * @param {*} type - input type
 * @param {*} name - input name
 * @param {*} value - input value
 * @param {*} onChange - function to be executed with input value is changed
 * @param {*} errorMessage - message to be displayed if input is invalid
 * @param {*} placeHolder - input placeholder
 * @returns Input component
 */
const Input = ({
  type, name, label, value, onChange, placeHolder, error, isValid, errorMessage
}) => {
  const [inputType, setInputType] = useState('password');
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
    <>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <div className={styles.row}>
        {name === 'email' ? <EmailOutlined style={{ position: 'absolute' }} />
          : <VpnKey style={{ position: 'absolute' }} />}

        <input
          value={value}
          onChange={onChange}
          className={styles.input}
          type={name === 'password' ? inputType : type}
          name={name}
          placeholder={value || placeHolder}
        />
        {name === 'password' && <Button className="buttonUnstyledAbsolute" onClick={handleToggle}>{icon}</Button>}
      </div>
      <div className={styles.error}>
        {type === 'email' && error ? (
          <>
            {error}
            <Button className="linkButtonError">
              Sign Up?
            </Button>
          </>
        ) : null}
        {type === 'password' && error ? error : null}
        {!isValid && errorMessage}
      </div>
    </>
  );
};

export default Input;
