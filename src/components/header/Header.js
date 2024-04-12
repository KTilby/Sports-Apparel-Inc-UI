import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import logo from '../../assets/images/inline_logo_2.svg';
import styles from './Header.module.css';
import SearchBox from '../search/SearchBox';
import { useCart } from '../checkout-page/CartContext';
import Button from '../button/Button';
import UserMenu from '../user-menu/UserMenu';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = ({ handleOpen, user, setUser }) => {
  // get state of item count from the useCart hook to update whenever itemCount changes
  const { state } = useCart();
  const [itemCount, setItemCount] = useState(state.itemCount);
  const history = useHistory();

  // synchronize itemCount with the cart's item count
  useEffect(() => {
    setItemCount(state.itemCount);
  }, [state.itemCount]);

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    if (history.location.pathname === '/checkout') {
      history.push('/cart');
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={styles.headerContainer}>
      <nav className={styles.navContainer}>

        <NavLink to="/">
          <div className={styles.imageContainer}>
            <img
              src={logo}
              alt="Sports Apparel Inc Logo"
              aria-label="Home"
            />
          </div>
        </NavLink>
        <ul className={styles.navGroup}>
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
        <ul className={styles.navGroup}>
          <li>
            <NavLink
              activeClassName={styles.shoppingCartActive}
              className={styles.shoppingCart}
              to="/cart"
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
      </nav>
    </div>
  );
};

export default Header;
