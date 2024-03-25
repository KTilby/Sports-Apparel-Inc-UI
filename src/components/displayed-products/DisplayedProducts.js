import React from 'react';
import styles from './DisplayedProducts.module.css';
import Constants from '../../utils/constants';

/**
 * @name DisplayedProducts
 * @description provides styling for a title and header
 * @returns component
 */
const DisplayedProducts = ({ children, apiError, header }) => (
  <div className={styles.displayedProducts}>
    {apiError && (
    <p className={styles.errMsg} data-testid="errMsg">
      {Constants.API_ERROR}
    </p>
    )}
    <div className={styles.title}>
      <h2 className={styles.heading}>{header}</h2>
    </div>
    <div className={styles.displayedProductsList}>
      {children}
    </div>
  </div>
);

export default DisplayedProducts;
