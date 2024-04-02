import React from 'react';
import { useCart } from './CartContext';
import styles from './CheckoutPage.module.css';
import ReviewOrderWidget from './ReviewOrderWidget';
import { getSubtotal } from './ReviewOrderWidgetService';
import Button from '../button/Button';
import EmptyCartPage from './EmptyCartPage';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = () => {
  const {
    state: { products, itemCount }
  } = useCart();

  return (
    <>
      {(itemCount === 0) ? (
        <EmptyCartPage />
      ) : (
        // Review Order Card
        <div className={styles.checkoutContainer2}>
          <div className={`${styles.step} ${styles.order}`}>
            <h3 className={styles.title}>Review Order</h3>
            <ReviewOrderWidget />
          </div>
          {/* Cart Subtotal Card */}
          <div className={`${styles.step} ${styles.subtotal}`}>
            <h3 className={styles.title}>
              Subtotal (
              {itemCount}
              {' '}
              items):
              <span className={styles.price}>{getSubtotal(products)}</span>
            </h3>
            <hr />
            <Button className="checkOutButton">
              Proceed to checkout
            </Button>
          </div>
        </div>
      )}
    </>

  );
};
export default CheckoutPage;
