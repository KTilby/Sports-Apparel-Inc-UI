import React from 'react';
import FormItem from '../../form/FormItem';
import FormItemDropdown from '../../form/FormItemDropdown';
import styles from './DeliveryAddress.module.css';
import STATES_LIST from '../../../utils/statesList.json';

/**
 * @name DeliveryAddress
 * @description Allows entry of delivery address
 * @return component
 */
const DeliveryAddress = ({ onChange, deliveryData }) => (
  <div className={styles.deliveryAddress}>
    <FormItem
      type="text"
      id="firstName"
      label="First Name"
      onChange={onChange}
      value={deliveryData.firstName}
    />

    <FormItem
      type="text"
      id="lastName"
      label="Last Name"
      onChange={onChange}
      value={deliveryData.lastName}
    />

    <FormItem
      placeholder="e.g. 123 Sesame Street"
      type="text"
      id="street"
      label="Street"
      onChange={onChange}
      value={deliveryData.street}
    />

    <FormItem
      placeholder="e.g. Unit #1"
      type="text"
      id="street2"
      label="Street 2 (Optional)"
      onChange={onChange}
      value={deliveryData.street2}
    />

    <FormItem
      type="text"
      id="city"
      label="City"
      onChange={onChange}
      value={deliveryData.city}
    />

    <FormItemDropdown
      id="state"
      label="State"
      onChange={onChange}
      value={deliveryData.state}
      options={STATES_LIST}
    />

    <FormItem
      placeholder="e.g. 12345"
      type="text"
      id="zip"
      label="Zip"
      onChange={onChange}
      value={deliveryData.zip}
    />
    <FormItem
      placeholder="e.g. example@catalyte.io"
      type="email"
      id="deliveryEmail"
      label="Email"
      onChange={onChange}
      value={deliveryData.email}
    />

    <FormItem
      placeholder="e.g. 555-555-5555"
      type="text"
      id="deliverPhone"
      label="Phone"
      onChange={onChange}
      value={deliveryData.phone}
    />
  </div>
);

export default DeliveryAddress;
