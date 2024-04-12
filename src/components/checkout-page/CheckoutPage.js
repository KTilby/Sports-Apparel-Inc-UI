import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import styles from './CheckoutPage.module.css';
import DeliveryAddress from './forms/DeliveryAddress';
import BillingDetails from './forms/BillingDetails';
import makePurchase from './CheckoutService';
import Button from '../button/Button';
import PaymentDetails from './forms/PaymentDetails';
import CartSummary from './forms/CartSummary';
import { calculateTaxes, getSubtotal } from './ReviewOrderWidgetService';
import taxRates from '../../utils/taxRates.json';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = ({ user }) => {
  const history = useHistory();
  const {
    state: { products }
  } = useCart();
  const [paymentData, setPaymentData] = useState({
    creditCard: '',
    cvv: '',
    expiration: '',
    cardholder: ''
  });

  const [billingData, setBillingData] = useState({
    billingStreet: '',
    billingStreet2: '',
    billingCity: '',
    billingState: '',
    billingZip: ''
  });

  const [deliveryData, setDeliveryData] = useState({
    firstName: '',
    lastName: '',
    street: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    email: '',
    phone: ''
  });
  const [useShippingForBilling, setUseShippingForBilling] = useState(false);
  const subtotal = getSubtotal(products);
  const [taxes, setTaxes] = useState(0);
  const [areFormsCompleted, setAreFormsCompleted] = useState(false);

  useEffect(() => {
    if (user) {
      setDeliveryData({
        firstName: user.firstName,
        lastName: user.lastName,
        street: user.shippingAddress1,
        street2: user.shippingAddress2,
        city: user.shippingCity,
        state: user.shippingState,
        zip: user.shippingZipCode,
        email: user.email,
        phone: user.phoneNumber
      });
    }
  }, [user]);

  // calculate taxes when delivery state changes
  useEffect(() => {
    let taxRate = taxRates[deliveryData.state];
    if (taxRate === undefined) {
      taxRate = 0.0;
    }
    const newTaxes = calculateTaxes(subtotal, taxRate);
    setTaxes(newTaxes);
  }, [deliveryData.state, subtotal]);

  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };

  const onPaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.id]: e.target.value });
  };

  const handleCheck = (e) => {
    const isChecked = e.target.checked;
    setUseShippingForBilling(isChecked);
  };

  useEffect(() => {
    if (useShippingForBilling) {
      setBillingData({
        billingStreet: deliveryData.street,
        billingStreet2: deliveryData.street2,
        billingCity: deliveryData.city,
        billingState: deliveryData.state,
        billingZip: deliveryData.zip
      });
    } else {
      setBillingData({
        billingStreet: '',
        billingStreet2: '',
        billingCity: '',
        billingState: '',
        billingZip: ''
      });
    }
  }, [useShippingForBilling, deliveryData]);

  // check if forms are completed
  useEffect(() => {
    if (deliveryData.firstName && deliveryData.lastName
      && deliveryData.street && deliveryData.city && deliveryData.state && deliveryData.zip
      && billingData.billingStreet && billingData.billingCity
      && billingData.billingState && billingData.billingZip
      && paymentData.cardholder && paymentData.creditCard
      && paymentData.expiration && paymentData.cvv) {
      setAreFormsCompleted(true);
    } else {
      setAreFormsCompleted(false);
    }
  }, [deliveryData, billingData, paymentData]);

  const handlePay = () => {
    const productData = products.map(({ id, quantity }) => ({ id, quantity }));
    const deliveryAddress = {
      firstName: deliveryData.firstName,
      lastName: deliveryData.lastName,
      street: deliveryData.street,
      street2: deliveryData.street2,
      city: deliveryData.city,
      state: deliveryData.state,
      zip: deliveryData.zip
    };
    const billingAddress = {};
    if (useShippingForBilling) {
      billingAddress.street = deliveryAddress.street;
      billingAddress.street2 = deliveryAddress.street2;
      billingAddress.city = deliveryAddress.city;
      billingAddress.state = deliveryAddress.state;
      billingAddress.zip = deliveryAddress.zip;
    } else {
      billingAddress.street = billingData.billingStreet;
      billingAddress.street2 = billingData.billingStreet2;
      billingAddress.city = billingData.billingCity;
      billingAddress.state = billingData.billingState;
      billingAddress.zip = billingData.billingZip;
    }

    const creditCard = {
      cardNumber: paymentData.creditCard,
      cvv: paymentData.cvv,
      expiration: paymentData.expiration,
      cardholder: paymentData.cardholder
    };
    makePurchase(productData, deliveryAddress, billingAddress, creditCard).then(() => history.push('/confirmation'));
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={`${styles.step} ${styles.delivery}`}>
        <h3 className={styles.title}>Delivery Address</h3>
        <DeliveryAddress onChange={onDeliveryChange} deliveryData={deliveryData} />
      </div>
      <div className={`${styles.step} ${styles.billing}`}>
        <h3 className={styles.title}>Billing Details</h3>
        <label htmlFor="useSame" className={styles.sameAddressText}>
          <div className={styles.useSameAddress}>
            <input
              id="useSame"
              name="useSame"
              onChange={handleCheck}
              type="checkbox"
              value={useShippingForBilling}
            />
          </div>
          Same as Delivery Address
        </label>
        {/* {!useShippingForBilling && ( */}
        <BillingDetails
          onChange={onBillingChange}
          billingData={billingData}
          useShippingForBilling={useShippingForBilling}
        />
        {/* )} */}
      </div>
      <div className={`${styles.step} ${styles.payment}`}>
        <h3 className={styles.title}>Payment Details</h3>
        <PaymentDetails
          paymentData={paymentData}
          onChange={onPaymentChange}
        />
      </div>
      <div className={`${styles.step} ${styles.summary}`}>
        <h3 className={styles.title}>Summary</h3>
        <CartSummary
          subtotal={subtotal}
          taxes={taxes}
        />
        <div className={styles.payNow}>
          <Button onClick={handlePay} className={!areFormsCompleted ? 'checkOutButtonDisabled' : 'checkOutButton'} disabled={!areFormsCompleted}>
            Process Payment
          </Button>
          <Link to="/cart">
            <Button className="checkOutButton">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
