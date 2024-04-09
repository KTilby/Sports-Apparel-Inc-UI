import React from 'react';
import {
  Card, CardContent, CardMedia, Typography, CardActions, Avatar
} from '@material-ui/core';
import { Delete, Share, PlaylistAdd } from '@material-ui/icons';
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
    <Card className="mb-3" style={{ marginBottom: '10px' }}>
      <CardContent className={styles.cardContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* Item Avatar */}
            <Avatar
              aria-label="demographics"
              className={styles.avatar}
              style={{
                backgroundColor: getDemographicColor(product.demographic),
                marginRight: '8px'
              }}
            >
              {getFirstCharacter(product.demographic)}
            </Avatar>
            {/* Item Image */}
            <CardMedia
              image={product.image}
              title="placeholder"
              component="img"
              style={{ width: 100, height: 100 }}
              alt="Shopping item"
            />
            {/* Item Details */}
            <div style={{ marginLeft: 15 }}>
              <Typography variant="h5">{product.name}</Typography>
              <Typography className={styles.subtitle}>
                {product.demographic}
                {' '}
                {product.category}
                {' '}
                {product.type}
              </Typography>
              <Typography variant="body2" className={styles.typography}>{product.description}</Typography>
              <Typography variant="body2" className={styles.typography}>{toPrice(product.price)}</Typography>
            </div>
          </div>
          {/* Quantity and Total Price */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <div style={{ width: 50 }}>
              <Typography variant="h5" className="fw-normal mb-0">{product.quantity}</Typography>
            </div>
            <div style={{ width: 80 }}>
              <Typography variant="h5" className="mb-0">{toPrice(product.quantity * product.price)}</Typography>
            </div>
          </div>
        </div>
      </CardContent>
      <CardActions className={styles.buttonActions} style={{ justifyContent: 'flex-end' }}>
        <Button className="buttonUnstyled" aria-label="share with someone">
          <Share style={{ color: 'var(--flame-orange-color', width: '30px', height: '30px' }} />
        </Button>
        {isCustomerLoggedIn
        && (
          <Button className="buttonUnstyled" aria-label="add to your wish list" onClick={handleAddToWishList}>
            <PlaylistAdd style={{ color: 'var(--flame-orange-color', width: '30px', height: '30px' }} />
          </Button>
        )}
        <Button
          className="buttonUnstyled"
          aria-label="Delete"
          onClick={handleDeleteFromCart}
        >
          <Delete style={{ color: 'var(--flame-orange-color)', display: 'none' }} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderItem;
