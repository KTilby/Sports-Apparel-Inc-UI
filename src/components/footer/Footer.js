import React, { useState, useEffect } from 'react';
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
      <div className={style.footerBox}>
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
