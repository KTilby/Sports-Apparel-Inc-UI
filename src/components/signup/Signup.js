import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Signup.module.css';
import Button from '../button/Button';
import SignupInput from './SignupInput';
import HttpHelper from '../../utils/HttpHelper';
import cartService from '../checkout-page/CartService';
import { useCart } from '../checkout-page/CartContext';
import { useWishList } from '../wishlist-page/WishListContext';
import wishListService from '../wishlist-page/WishListService';
import STATES_LIST from '../../utils/statesList.json';
import FormItemDropdown from './FormItemDropdown';

const Signup = ({ handleClose, setUser }) => {
  const navigate = useHistory();
  const { dispatch: cartDispatch } = useCart();
  const { wishDispatch } = useWishList();
  const [firstNameInput, setFirstNameInput] = useState({
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    errorMessage: 'Must enter a name',
    error: false,
    value: ''
  });
  const [lastNameInput, setLastNameInput] = useState({
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    errorMessage: 'Must enter a name',
    error: false,
    value: ''
  });
  const [phoneNumberInput, setPhoneNumberInput] = useState({
    name: 'phoneNumber',
    type: 'tel',
    label: 'Phone Number',
    errorMessage: 'Must be in format XXX-XXX-XXXX',
    error: false,
    value: ''
  });
  const [emailInput, setEmailInput] = useState({
    name: 'email',
    type: 'email',
    label: 'Email (Username)',
    errorMessage: 'Must be a valid email',
    error: false,
    value: ''
  });
  const [passwordInput, setPasswordInput] = useState({
    name: 'password',
    type: 'password',
    label: 'Password',
    errorMessage: 'Password must be at least 8 characters with upper and lowercase letter, number, and special character',
    error: false,
    value: ''
  });
  const [retypePasswordInput, setRetypePasswordInput] = useState({
    name: 'password',
    type: 'password',
    label: 'Confirm Password',
    errorMessage: 'Passwords do not match',
    error: false,
    value: ''
  });
  const [address1Input, setAddress1Input] = useState({
    name: 'address1',
    type: 'text',
    label: 'Address',
    errorMessage: 'Must enter an address',
    error: false,
    value: ''
  });
  const [address2Input, setAddress2Input] = useState({
    name: 'address2',
    type: 'text',
    label: 'Address 2',
    errorMessage: '',
    error: false,
    value: ''
  });
  const [cityInput, setCityInput] = useState({
    name: 'city',
    type: 'text',
    label: 'City',
    errorMessage: 'Must enter a city',
    error: false,
    value: ''
  });
  const [stateInput, setStateInput] = useState({
    name: 'state',
    type: 'text',
    label: 'State',
    errorMessage: 'Must be a valid State',
    error: false,
    value: ''
  });
  const [zipCodeInput, setZipCodeInput] = useState({
    name: 'zipCode',
    type: 'text',
    label: 'Zip Code',
    errorMessage: 'Must be a valid Zip Code',
    error: false,
    value: ''
  });

  const onChangeFirstName = (e) => {
    setFirstNameInput({
      ...firstNameInput,
      value: e.target.value,
      error: false
    });
  };

  const onChangeLastName = (e) => {
    setLastNameInput({
      ...lastNameInput,
      value: e.target.value,
      error: false
    });
  };

  const onChangePhoneNumber = (e) => {
    setPhoneNumberInput({
      ...phoneNumberInput,
      value: e.target.value,
      error: false
    });
  };

  const onChangeEmail = (e) => {
    setEmailInput({
      ...emailInput,
      value: e.target.value,
      error: false
    });
  };

  const onChangePassword = (e) => {
    setPasswordInput({
      ...passwordInput,
      value: e.target.value,
      error: false
    });
  };

  const onChangeRetypePassword = (e) => {
    setRetypePasswordInput({
      ...retypePasswordInput,
      value: e.target.value,
      error: false
    });
  };

  const onChangeAddressOne = (e) => {
    setAddress1Input({
      ...address1Input,
      value: e.target.value,
      error: false
    });
  };

  const onChangeAddressTwo = (e) => {
    setAddress2Input({
      ...address2Input,
      value: e.target.value,
      error: false
    });
  };

  const onChangeCity = (e) => {
    setCityInput({
      ...cityInput,
      value: e.target.value,
      error: false
    });
  };

  const onChangeState = (e) => {
    setStateInput({
      ...stateInput,
      value: e.target.value,
      error: false
    });
  };

  const onChangeZipCode = (e) => {
    setZipCodeInput({
      ...zipCodeInput,
      value: e.target.value,
      error: false
    });
  };

  const validateValues = () => {
    let formValid = true;
    const validEmail = /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/;
    const validPassword = /(?=^.{8,}$)(?=.*[!@#$%^&*]+)(?![.n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    const validPhone = /^([0-9]{3}-){2}[0-9]{4}$/;
    const validZip = /^[0-9]{5}$/;

    if (firstNameInput.value.length < 1) {
      setFirstNameInput({
        ...firstNameInput,
        error: true
      });
      formValid = false;
    }
    if (lastNameInput.value.length < 1) {
      setLastNameInput({
        ...lastNameInput,
        error: true
      });
      formValid = false;
    }
    if (!validPhone.test(phoneNumberInput.value)) {
      setPhoneNumberInput({
        ...phoneNumberInput,
        error: true
      });
      formValid = false;
    }
    if (!validEmail.test(emailInput.value)) {
      setEmailInput({
        ...emailInput,
        error: true
      });
      formValid = false;
    }

    if (!validPassword.test(passwordInput.value)) {
      setPasswordInput({
        ...passwordInput,
        error: true
      });
      formValid = false;
    }
    if (retypePasswordInput.value !== passwordInput.value || retypePasswordInput.value.length < 1) {
      setRetypePasswordInput({
        ...retypePasswordInput,
        error: true
      });
      formValid = false;
    }
    if (address1Input.value.length < 1) {
      setAddress1Input({
        ...address1Input,
        error: true
      });
      formValid = false;
    }
    if (cityInput.value.length < 1) {
      setCityInput({
        ...cityInput,
        error: true
      });
      formValid = false;
    }
    if (!validZip.test(zipCodeInput.value)) {
      setZipCodeInput({
        ...zipCodeInput,
        error: true
      });
      formValid = false;
    }

    return formValid;
  };

  const handleSuccessfulLogin = (data) => {
    navigate.push({ pathname: '/' });
    window.location.reload();
    sessionStorage.setItem('user', JSON.stringify(data));
    setUser(data);
    handleClose();
    if (data.savedCart[0] !== null) {
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
      const body = {
        email: emailInput.value,
        password: passwordInput.value,
        role: 'Customer',
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        shippingAddress1: address1Input.value,
        shippingAddress2: address2Input.value,
        shippingCity: cityInput.value,
        shippingState: stateInput.value,
        shippingZipCode: zipCodeInput.value,
        billingAddress1: address1Input.value,
        billingAddress2: address2Input.value,
        billingCity: cityInput.value,
        billingZipCode: zipCodeInput.value,
        phoneNumber: phoneNumberInput.value
      };
      HttpHelper('/users/customers', 'POST', body)
        .then((response) => (response.json()))
        .then((data) => {
          handleSuccessfulLogin(data);
        })
        .catch(() => {
          console.log('error2');
        });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.signupForm}>
        <div className={styles.row}>
          <SignupInput
            name={phoneNumberInput.value}
            type={phoneNumberInput.type}
            label={phoneNumberInput.label}
            value={phoneNumberInput.value}
            onChange={onChangePhoneNumber}
            error={phoneNumberInput.error}
            errorMessage={phoneNumberInput.errorMessage}
          />
          <SignupInput
            name={emailInput.name}
            type={emailInput.type}
            label={emailInput.label}
            value={emailInput.value}
            onChange={onChangeEmail}
            error={emailInput.error}
            errorMessage={emailInput.errorMessage}
          />
        </div>
        <div className={styles.row}>
          <SignupInput
            name={passwordInput.name}
            type={passwordInput.type}
            label={passwordInput.label}
            value={passwordInput.value}
            onChange={onChangePassword}
            error={passwordInput.error}
            errorMessage={passwordInput.errorMessage}
          />
          <SignupInput
            name={retypePasswordInput.name}
            type={retypePasswordInput.type}
            label={retypePasswordInput.label}
            value={retypePasswordInput.value}
            onChange={onChangeRetypePassword}
            error={retypePasswordInput.error}
            errorMessage={retypePasswordInput.errorMessage}
          />
        </div>
        <div className={styles.row}>
          <SignupInput
            name={firstNameInput.value}
            type={firstNameInput.type}
            label={firstNameInput.label}
            value={firstNameInput.value}
            onChange={onChangeFirstName}
            error={firstNameInput.error}
            errorMessage={firstNameInput.errorMessage}
          />
          <SignupInput
            name={lastNameInput.value}
            type={lastNameInput.type}
            label={lastNameInput.label}
            value={lastNameInput.value}
            onChange={onChangeLastName}
            error={lastNameInput.error}
            errorMessage={lastNameInput.errorMessage}
          />
        </div>
        <div className={styles.row}>
          <SignupInput
            name={address1Input.value}
            type={address1Input.type}
            label={address1Input.label}
            value={address1Input.value}
            onChange={onChangeAddressOne}
            error={address1Input.error}
            errorMessage={address1Input.errorMessage}
          />
          <SignupInput
            name={address2Input.value}
            type={address2Input.type}
            label={address2Input.label}
            value={address2Input.value}
            onChange={onChangeAddressTwo}
            error={address2Input.error}
            errorMessage={address2Input.errorMessage}
          />
        </div>
        <div className={styles.row}>
          <SignupInput
            name={cityInput.value}
            type={cityInput.type}
            label={cityInput.label}
            value={cityInput.value}
            onChange={onChangeCity}
            error={cityInput.error}
            errorMessage={cityInput.errorMessage}
          />
          <FormItemDropdown
            id="state"
            label="State"
            value={stateInput.value}
            onChange={onChangeState}
            options={STATES_LIST}
          />
        </div>
        <div className={styles.row}>
          <SignupInput
            name={zipCodeInput.value}
            type={zipCodeInput.type}
            label={zipCodeInput.label}
            value={zipCodeInput.value}
            onChange={onChangeZipCode}
            error={zipCodeInput.error}
            errorMessage={zipCodeInput.errorMessage}
          />
          <Button isSubmit name="Signup" className="signupFormButton" onClick={handleSubmit}>
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
