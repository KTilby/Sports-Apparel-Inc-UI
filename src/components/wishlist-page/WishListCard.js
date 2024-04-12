import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions,
  Avatar, Typography
} from '@material-ui/core';
import { AddShoppingCart, Delete } from '@material-ui/icons';
import styles from './WishListCard.module.css';
import { useCart } from '../checkout-page/CartContext';
import Button from '../button/Button';
import getImage from '../../utils/productImageControl';
import cartService from '../checkout-page/CartService';
import { getDemographicColor, getFirstCharacter } from '../../utils/common';
import wishListService from './WishListService';
import { useWishList } from './WishListContext';

/**
 * @name WishListCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const WishListCard = ({ product, setOpen, setCurrentProd }) => {
  const { dispatch, state } = useCart();
  const { wishDispatch, wishState } = useWishList();

  const openModal = () => {
    setOpen();
    setCurrentProd(product);
  };

  const handleAddToCart = () => {
    cartService.addToCart(product, dispatch, state);
  };

  const handleDeleteFromWishlist = () => {
    wishListService.deleteFromWishList(product, wishDispatch, wishState);
  };

  return (
    <Card className={styles.root}>
      <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardHeader
          classes={{
            root: styles.header,
            title: styles.title
          }}
          avatar={(
            <Avatar
              aria-label="demographics"
              className={styles.avatar}
              style={{
                backgroundColor: getDemographicColor(product.demographic)
              }}
            >
              {getFirstCharacter(product.demographic)}
            </Avatar>
          )}
          title={product.name}
          titleTypographyProps={{ variant: 'h5' }}
        />
        <CardMedia
          className={styles.media}
          image={getImage(product.category, product.pets)}
          title={product.category}
        />
        <CardContent className={styles.cardContent}>
          <Typography className={styles.subtitle}>
            {product.demographic}
            {' '}
            {product.category}
            {' '}
            {product.type}
          </Typography>
          <Typography className={styles.typography}>
            {product.description}
          </Typography>
          <Typography className={styles.typography}>
            Price: $
            {product.price}
          </Typography>
        </CardContent>
      </Link>
      <CardActions className={styles.buttonActions} disableSpacing>
        <Button className="buttonUnstyled" aria-label="add to shopping cart" onClick={handleAddToCart}>
          <AddShoppingCart style={{ color: 'var(--flame-orange-color)', width: '30px', height: '30px' }} />
        </Button>
        <Button className="buttonUnstyled" aria-label="Delete" onClick={handleDeleteFromWishlist}>
          <Delete style={{ color: 'var(--flame-orange-color)' }} />
        </Button>
        <Button className="viewButton" onClick={openModal} aria-label="view product details">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default WishListCard;
