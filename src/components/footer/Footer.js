import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/inline_logo_2.svg';
import style from './Footer.module.css';

const Footer = () => {
  const [year, setYear] = useState();

  /**
   * Grabs the current year of the client webpage
   */
  const getYear = () => {
    const date = new Date();
    const dateObject = date.getFullYear();
    setYear(dateObject);
  };

  useEffect(() => {
    getYear();
  }, []);

  return (
    <div className={style.footer}>
      <div className={style.footerContainer}>
        <NavLink to="/">
          <img
            src={logo}
            alt="Sports Apparel Inc Logo"
            width={250}
            aria-label="Home"
          />
        </NavLink>
        <ul className={style.navList}>
          <li>
            <NavLink
              activeClassName={style.active}
              className={style.navItem}
              to="/men"
              aria-label="View Page for Men"
            >
              Men
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={style.active}
              className={style.navItem}
              to="/women"
              aria-label="View Page for Women"
            >
              Women
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={style.active}
              className={style.navItem}
              to="/kids"
              aria-label="View Page for Kids"
            >
              Kids
            </NavLink>
          </li>
          <li>
            <NavLink
              activeClassName={style.active}
              className={style.navItem}
              to="/pets"
              aria-label="View Page for Pets"
            >
              Pets
            </NavLink>
          </li>
        </ul>
        <p className={style.content}>
          &copy;
          {' '}
          {year}
          {' '}
          Sports Apparel Inc.
        </p>
      </div>
    </div>
  );
};

export default Footer;
