import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  EmailOutlined, Visibility, VisibilityOff, VpnKey
} from '@material-ui/icons';
import Button from '../button/Button';
import { getInputType } from '../../utils/common';
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
  type, name, label, value, onChange,
  placeHolder, error, isValid, errorMessage, className, handleClose
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

  const renderIcon = () => {
    switch (name) {
      case 'email':
        return <EmailOutlined style={{ position: 'absolute' }} />;
      case 'password':
        return <VpnKey style={{ position: 'absolute' }} />;
      default:
        return null;
    }
  };

  return (
    <>
      {label && <label className={styles.label} htmlFor={name}>{label}</label>}
      <div className={styles.row}>
        {renderIcon(name)}
        <input
          value={value}
          onChange={onChange}
          className={`${styles[className]}`}
          type={inputType}
          name={name}
          placeholder={value || placeHolder}
        />
        {name === 'password' && <Button className="buttonUnstyledAbsolute" onClick={handleToggle}>{icon}</Button>}
      </div>
      <div className={styles.error}>
        {type === 'email' && error ? (
          <>
            {error}
            <Button className="linkButtonError" onClick={handleClose}>
              <NavLink to="/signup" className={styles.errorLink}>Sign Up?</NavLink>
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
