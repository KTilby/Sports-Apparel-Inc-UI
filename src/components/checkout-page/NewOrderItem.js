import React from 'react';
import {
  Card, CardContent, CardMedia, Typography, CardActions, Avatar
} from '@material-ui/core';
import { Delete, Favorite } from '@material-ui/icons';
import styles from './OrderItem.module.css';
import { toPrice } from './ReviewOrderWidgetService';
import Button from '../button/Button';
import cartService from './CartService';
import { useCart } from './CartContext';
import { getDemographicColor, getFirstCharacter } from '../../utils/common';
import { useWishList } from '../wishlist-page/WishListContext';
import wishListService from '../wishlist-page/WishListService';

/**
 * @name OrderItem
 * @description Displays an order row
 * @return component
 */
const OrderItem = ({ product }) => {
  const { dispatch, state } = useCart();

  const handleDeleteFromCart = () => {
    cartService.deleteFromCart(product, dispatch, state);
  };

  const { wishDispatch, wishState } = useWishList();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const isCustomerLoggedIn = user && user.role === 'Customer';
  const handleAddToWishList = () => {
    wishListService.addToWishList(product, wishDispatch, wishState);
  };

  return (
    <Card className={styles.itemCard}>
      <CardContent className={styles.itemCardContent}>
        <div className={styles.leftSection}>
          <div className={styles.cardLeft}>
            {/* Item Avatar */}
            <Avatar
              aria-label="demographics"
              className={styles.avatar}
              style={{
                backgroundColor: getDemographicColor(product.demographic)
              }}
            >
              {getFirstCharacter(product.demographic)}
            </Avatar>
            {/* Item Image */}
            <CardMedia
              className={styles.itemImage}
              image={product.image}
              title="placeholder"
              component="img"
              alt="Shopping item"
            />
            {/* Item Details */}
            <div className={styles.itemCardDetails}>
              <Typography className={`${styles.typography} ${styles.itemTitle}`}>{product.name}</Typography>
              <Typography className={styles.subtitle}>
                {product.demographic}
                {' '}
                {product.category}
                {' '}
                {product.type}
              </Typography>
              <Typography className={`${styles.typography} ${styles.body2}`}>{product.description}</Typography>
            </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.cardRight}>
            <div className={styles.priceContainer}>
              <Typography className={`${styles.typography} ${styles.quantityHeader}`}>Price</Typography>
              <Typography className={`${styles.h5} ${styles.itemQuantity}`}>{toPrice(product.price)}</Typography>
            </div>
            <div className={styles.priceContainer}>
              <Typography className={`${styles.typography} ${styles.quantityHeader}`}>Quantity</Typography>
              <Typography className={`${styles.h5} ${styles.itemQuantity}`}>{product.quantity}</Typography>
            </div>
            <div className={styles.priceContainer}>
              <Typography className={`${styles.typography} ${styles.totalHeader}`}>Total</Typography>
              <Typography className={`${styles.h5} ${styles.itemQuantity}`}>{toPrice(product.quantity * product.price)}</Typography>
            </div>
          </div>
        </div>
        <CardActions className={styles.buttonActions}>
          {isCustomerLoggedIn
          && (
            <Button className="buttonUnstyled" aria-label="add to your wish list" onClick={handleAddToWishList}>
              <Favorite style={{ color: 'var(--flame-orange-color', width: '30px', height: '30px' }} />
            </Button>
          )}
          <Button
            className="buttonUnstyled"
            aria-label="Delete"
            onClick={handleDeleteFromCart}
          >
            <Delete style={{ color: 'var(--flame-orange-color)', width: '30px', height: '30px' }} />
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
