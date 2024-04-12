import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCart } from './CartContext';
import styles from './ShoppingCartPage.module.css';
import ReviewOrderWidget from './ReviewOrderWidget';
import { getSubtotal, toPrice } from './ReviewOrderWidgetService';
import Button from '../button/Button';
import EmptyCartPage from './EmptyCartPage';

/**
 * @name ShoppingCartPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const ShoppingCartPage = () => {
  const {
    state: { products, itemCount }
  } = useCart();
  const navigate = useHistory();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const isCustomerLoggedIn = user && user.role === 'Customer';

  const handleCheckout = () => {
    navigate.push({
      pathname: '/checkout'
    });
  };

  return (
    <>
      {(itemCount === 0) ? (
        <EmptyCartPage />
      ) : (
        // Review Order Card
        <div className={styles.cartContainer}>
          <div className={styles.order}>
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
              {' '}
              <span className={styles.price}>{toPrice(getSubtotal(products))}</span>
            </h3>
            {(isCustomerLoggedIn && itemCount > 0) && (
              <Button className="checkOutButton" onClick={handleCheckout}>
                Proceed to checkout
              </Button>
            )}
          </div>
        </div>
      )}
    </>

  );
};
export default ShoppingCartPage;
