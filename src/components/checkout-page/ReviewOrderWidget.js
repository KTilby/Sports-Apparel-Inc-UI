import React from 'react';
import { useCart } from './CartContext';
import OrderItem from './NewOrderItem';
// import { getSubtotal } from './ReviewOrderWidgetService';
// import styles from './ReviewOrderWidget.module.css';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = () => {
  const {
    state: { products }
  } = useCart();
  return (
    <>
      {products.map((product) => (
        <OrderItem
          key={product.id}
          product={product}
        />
      ))}
      {/* <hr /> */}
      {/* <div className={styles.subtotal}>
        <div>
          <p>Subtotal</p>
        </div>
        <div className={styles.price}>
          <p>{getSubtotal(products)}</p>
        </div>
      </div> */}
    </>
  );
};

export default ReviewOrderWidget;
