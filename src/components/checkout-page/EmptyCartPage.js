import React from 'react';
import styles from './CheckoutPage.module.css';

const EmptyCartPage = () => (
  <div className={styles.emptyCartContainer}>
    <div className={styles.emptyCartMessage}>
      <h2>Nothing to see here. Add products to your cart to get started.</h2>
    </div>
  </div>
);

export default EmptyCartPage;
