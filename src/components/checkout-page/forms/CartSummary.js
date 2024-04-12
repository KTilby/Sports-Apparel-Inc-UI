import React from 'react';
import styles from '../CheckoutPage.module.css';
import { toPrice } from '../ReviewOrderWidgetService';

const CartSummary = ({ subtotal, taxes }) => (
  <div className={styles.summary}>
    <dl className={styles.subtotal}>
      <dt>Subtotal</dt>
      <dd>{toPrice(subtotal)}</dd>
      <dt>Estimated Taxes & Fees</dt>
      <dd>{toPrice(taxes)}</dd>
    </dl>
    <dl className={styles.total}>
      <dt>Total</dt>
      <dd>{toPrice(subtotal + taxes)}</dd>
    </dl>
  </div>
);

export default CartSummary;
