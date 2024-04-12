import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './login.module.css';
import Button from '../button/Button';
import Input from '../input/Input';
import HttpHelper from '../../utils/HttpHelper';
import cartService from '../checkout-page/CartService';
import { useCart } from '../checkout-page/CartContext';
import { useWishList } from '../wishlist-page/WishListContext';
import wishListService from '../wishlist-page/WishListService';
import { CHECK_YOUR_PASSWORD, USER_NOT_EXIST } from '../../utils/constants';

const Login = ({ handleClose, setUser }) => {
  const { dispatch: cartDispatch } = useCart();
  const { wishDispatch } = useWishList();
  const [emailInput, setEmailInput] = useState({
    name: 'email',
    type: 'email',
    label: 'Email',
    errorMessage: 'Must be a valid email',
    isValid: true,
    value: 'elementary@watson.uk'
  });

  const [passwordInput, setPasswordInput] = useState({
    name: 'password',
    type: 'password',
    label: 'Password',
    errorMessage: 'Please enter a password',
    isValid: true,
    value: 'P@$$w0rd'
  });

  const [error, setError] = useState(null);

  const onChangeEmail = (e) => {
    setError(null);
    setEmailInput({
      ...emailInput,
      value: e.target.value,
      isValid: true
    });
  };

  const onChangePassword = (e) => {
    setError(null);
    setPasswordInput({
      ...passwordInput,
      value: e.target.value,
      isValid: true
    });
  };

  const validateValues = () => {
    let formValid = true;
    const validEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;

    if (!validEmail.test(emailInput.value)) {
      setEmailInput({
        ...emailInput,
        isValid: false
      });
      formValid = false;
    }

    if (passwordInput.value.length < 1) {
      setPasswordInput({
        ...passwordInput,
        isValid: false
      });
      formValid = false;
    }
    return formValid;
  };

  const handleSuccessfulLogin = (data) => {
    sessionStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    handleClose();

    if (data.savedCart[1] > 0) {
      const cartData = data.savedCart[0];
      const itemCount = data.savedCart[1];
      cartService.initializeCart(cartData, itemCount, cartDispatch);
    }

    if (data.wishlist !== null) {
      const wishListData = data.wishlist;
      wishListService.initializeWishList(wishListData, wishDispatch);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateValues()) {
      HttpHelper('/login', 'POST', { email: emailInput.value, password: passwordInput.value })
        .then((response) => {
          if (response.status === 404) {
            setError(USER_NOT_EXIST);
            throw new Error(response.status);
          }

          if (response.status === 400) {
            setError(CHECK_YOUR_PASSWORD);
            throw new Error(response.status);
          }
          return response.json();
        }).then((data) => {
          handleSuccessfulLogin(data);
        })
        .catch(() => {
          console.log('error');
        });
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.loginContainer}>
        <div className={styles.rowEnd}>
          <Button className="closeButton" onClick={handleClose}>X</Button>
        </div>
        <h1 className={styles.title}>LOGIN</h1>

        <form className={styles.loginForm}>
          <Input
            className="loginInput"
            name={emailInput.name}
            type={emailInput.type}
            label={emailInput.label}
            value={emailInput.value}
            onChange={onChangeEmail}
            error={error === USER_NOT_EXIST ? error : null}
            isValid={emailInput.isValid}
            errorMessage={emailInput.errorMessage}
            handleClose={handleClose}
          />
          <Input
            className="loginInput"
            name={passwordInput.name}
            type={passwordInput.type}
            label={passwordInput.label}
            value={passwordInput.value}
            onChange={onChangePassword}
            error={error === CHECK_YOUR_PASSWORD ? error : null}
            isValid={passwordInput.isValid}
            errorMessage={passwordInput.errorMessage}
          />

          <Button isSubmit name="Login" className="loginFormButton" onClick={handleSubmit}>
            Login
          </Button>
          <Button className="linkButton" onClick={handleClose}>
            <NavLink to="/signup" className={styles.signupButton}>Sign Up</NavLink>
          </Button>

        </form>
      </div>
    </div>
  );
};

export default Login;
