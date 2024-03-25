import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import loginUser from './HeaderService';
import constants from '../../utils/constants';
import logo from '../../assets/images/inline_logo.svg';
import styles from './Header.module.css';
import SearchBox from '../search/SearchBox';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => {
  const [user, setUser] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = (response) => {
    sessionStorage.setItem('token', response.getAuthResponse().id_token);
    const googleUser = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    loginUser(googleUser, setUser, setApiError);
    setGoogleError('');
  };

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleError('There was a problem logging in with Google. Please wait and try again later.');
  };

  /**
   * @name handleGoogleLogoutSuccess
   * @description Function to run if google logout was successful
   */
  const handleGoogleLogoutSuccess = () => {
    setUser('');
    setGoogleError('');
  };

  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError('There was a problem logging out with Google. Please wait and try again later.');
  };

  return (
    <div className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <NavLink to="/">
          <img
            className={styles.logoImage}
            src={logo}
            alt="Sports Apparel Inc Logo"
            width={350}
            aria-label="Home"
          />
        </NavLink>
        <ul className={styles.navList}>
          <li>
            <NavLink
              activeClassName={styles.active}
              className={styles.navItem}
              to="/men"
              aria-label="View Page for Men"
            >
              Men
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.active}
              className={styles.navItem}
              to="/women"
              aria-label="View Page for Women"
            >
              Women
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={styles.active}
              className={styles.navItem}
              to="/kids"
              aria-label="View Page for Kids"
            >
              Kids
            </NavLink>
          </li>
        </ul>
        <ul className={styles.navList}>
          <li>
            <NavLink
              activeClassName={styles.shoppingCartActive}
              className={styles.shoppingCart}
              to="/checkout"
              aria-label="View Shopping Cart"
            >
              <ShoppingCartIcon />
            </NavLink>
          </li>
          <li>
            <SearchBox />
          </li>
          <li>
            {user && <span>{user.firstName}</span>}
            {user && <span>{user.lastName}</span>}
            {googleError && <span>{googleError}</span>}
            {apiError && <span>Api Error</span>}
            {!user ? (
              <GoogleLogin
                clientId={constants.GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
                cookiePolicy="single_host_origin"
              />
            ) : (
              <GoogleLogout
                clientId={constants.GOOGLE_CLIENT_ID}
                buttonText="Logout"
                onLogoutSuccess={handleGoogleLogoutSuccess}
                onFailure={handleGoogleLogoutFailure}
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
