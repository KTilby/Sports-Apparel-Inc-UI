import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import logo from '../../assets/images/inline_logo.svg';
import styles from './Header.module.css';
import SearchBox from '../search/SearchBox';
import { useCart } from '../checkout-page/CartContext';
import Button from '../button/Button';
import UserMenu from '../user-menu/UserMenu';
import HttpHelper from '../../utils/HttpHelper';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = ({ handleOpen, user, setUser }) => {
  // get state of item count from the useCart hook to update whenever itemCount changes
  const { state } = useCart();
  const [itemCount, setItemCount] = useState(state.itemCount);

  // synchronize itemCount with the cart's item count
  useEffect(() => {
    setItemCount(state.itemCount);
  }, [state.itemCount]);

  const handleLogout = () => {
    const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    const products = JSON.parse(sessionStorage.getItem('cart'));
    console.log(loggedInUser);
    console.log(products);
    console.log(itemCount);
    const route = `/users/customers/${loggedInUser.id}`;
    const payload = { ...loggedInUser, savedCart: [products, Number(itemCount)] };
    HttpHelper(route, 'PUT', payload)
      .then((response) => (response.json()))
      .then((data) => (console.log(data)))
      .catch((error) => (console.log(error)));
    window.location.reload();
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <div className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <div className={styles.imageContainer}>
          <NavLink to="/">
            <img
              src={logo}
              alt="Sports Apparel Inc Logo"
              width={350}
              aria-label="Home"
            />
          </NavLink>
        </div>
        <div className={styles.navGroup}>
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
            <li>
              <NavLink
                activeClassName={styles.active}
                className={styles.navItem}
                to="/pets"
                aria-label="View Page for Pets"
              >
                Pets
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
                <Badge
                  badgeContent={itemCount}
                  classes={{ badge: styles.shoppingCartCustomBadge }}
                >
                  <ShoppingCartIcon
                    classes={{
                      root: styles.shoppingCartRoot
                    }}
                  />
                </Badge>
              </NavLink>
            </li>
            <li>
              <SearchBox />
            </li>
            <li>
              {user
                ? <UserMenu handleLogout={handleLogout} user={user} />
                : <Button className="loginButton" onClick={handleOpen}>Login</Button>}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
