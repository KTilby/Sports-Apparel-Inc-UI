import React from 'react';
import FormItem from '../../form/FormItem';
import styles from '../CheckoutPage.module.css';

const PaymentDetails = ({ paymentData, onChange }) => (
  <div>
    <FormItem
      type="text"
      id="cardholder"
      label="Cardholder Name"
      onChange={onChange}
      value={paymentData.cardholder}
      readonly
    />
    <br />
    <FormItem
      placeholder="e.g. 1234567812345678"
      type="text"
      id="creditCard"
      label="Card Number"
      onChange={onChange}
      value={paymentData.creditCard}
      readonly
    />
    <br />
    <div className={styles.expCVC}>
      <div className={styles.expiration}>
        <FormItem
          placeholder="e.g. 05/21"
          type="text"
          id="expiration"
          label="Expiration"
          onChange={onChange}
          value={paymentData.expiration}
          readonly
        />
      </div>
      <div className={styles.security}>
        <FormItem
          placeholder="e.g. 555"
          type="text"
          id="cvv"
          label="CVV"
          onChange={onChange}
          value={paymentData.cvv}
          readonly
        />
      </div>
    </div>
  </div>
);

export default PaymentDetails;
