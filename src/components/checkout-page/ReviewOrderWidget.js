import React from 'react';
import { useCart } from './CartContext';
import OrderItem from './NewOrderItem';

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
    </>
  );
};

export default ReviewOrderWidget;
