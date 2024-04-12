import React from 'react';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';
import STATES_LIST from '../../../utils/statesList.json';

/**
 * @name BillingDetails
 * @description Allows entry of Billing Details
 * @return component
 */
const BillingDetails = ({ onChange, billingData }) => (
  <div className={styles.deliveryAddress}>
    <>
      <FormItem
        placeholder="e.g. 123 Sesame Street"
        type="text"
        id="billingStreet"
        label="Street"
        onChange={onChange}
        value={billingData.billingStreet}
      />

      <FormItem
        placeholder="e.g. Unit #1"
        type="text"
        id="billingStreet2"
        label="Street 2 (Optional)"
        onChange={onChange}
        value={billingData.billingStreet2}
      />

      <FormItem
        type="text"
        id="billingCity"
        label="City"
        onChange={onChange}
        value={billingData.billingCity}
      />

      <FormItemDropdown
        id="billingState"
        label="State"
        onChange={onChange}
        value={billingData.billingState}
        options={STATES_LIST}
      />

      <FormItem
        placeholder="e.g. 12345"
        type="text"
        id="billingZip"
        label="Zip"
        onChange={onChange}
        value={billingData.billingZip}
      />
    </>
  </div>
);

export default BillingDetails;
