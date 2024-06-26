import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardHeader, CardMedia, CardContent, CardActions,
  Avatar, Typography
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import styles from './productCard.module.css';
import { useCart } from '../checkout-page/CartContext';
import { useWishList } from '../wishlist-page/WishListContext';
import Button from '../button/Button';
import getImage from '../../utils/productImageControl';
import cartService from '../checkout-page/CartService';
import { getDemographicColor, getFirstCharacter } from '../../utils/common';
import wishListService from '../wishlist-page/WishListService';

/**
 * @name ProductCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ProductCard = ({ product, setOpen, setCurrentProd }) => {
  const { dispatch, state } = useCart();
  const { wishDispatch, wishState } = useWishList();

  const user = JSON.parse(sessionStorage.getItem('user'));
  const isCustomerLoggedIn = user && user.role === 'Customer';

  const openModal = () => {
    setOpen();
    setCurrentProd(product);
  };

  const handleAddToCart = () => {
    cartService.addToCart(product, dispatch, state);
  };

  const handleAddToWishList = () => {
    wishListService.addToWishList(product, wishDispatch, wishState);
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
        {isCustomerLoggedIn
        && (
        <Button className="buttonUnstyled" aria-label="add to favorites" onClick={handleAddToWishList}>
          <FavoriteIcon style={{ color: 'var(--flame-orange-color)', width: '30px', height: '30px' }} />
        </Button>
        )}
        <Button className="buttonUnstyled" aria-label="add to shopping cart" onClick={handleAddToCart}>
          <AddShoppingCartIcon style={{ color: 'var(--flame-orange-color)', width: '30px', height: '30px' }} />
        </Button>
        <Button className="viewButton" onClick={openModal} aria-label="view product details">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
