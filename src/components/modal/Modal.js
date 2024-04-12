import React, { useEffect, useRef, useState } from 'react';
import {
  Card, CardActions, Typography, CardMedia, CardHeader, Avatar
} from '@material-ui/core';
import { AddShoppingCart, Favorite } from '@material-ui/icons';
import cartService from '../checkout-page/CartService';
import styles from './Modal.module.css';
import Button from '../button/Button';
import getImage from '../../utils/productImageControl';
import { getDemographicColor, getFirstCharacter, parseColorCodeAndName } from '../../utils/common';
import { useCart } from '../checkout-page/CartContext';
import { useWishList } from '../wishlist-page/WishListContext';
import wishListService from '../wishlist-page/WishListService';

const Modal = ({ onClick, isOpen, product }) => {
  const { dispatch, state } = useCart();
  const currentProduct = product;
  const modalRef = useRef();
  const swatches = [product.primaryColorCodeWithName, product.secondaryColorCodeWithName];
  const swatchesColorCodeAndName = swatches.map(parseColorCodeAndName);
  const user = JSON.parse(sessionStorage.getItem('user'));
  const isCustomerLoggedIn = user && user.role === 'Customer';
  const { wishDispatch, wishState } = useWishList();

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (isOpen && !modalRef.current.contains(e.target)) {
        onClick();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleAddToCart = () => {
    cartService.addToCart(currentProduct, dispatch, state);
  };

  const handleAddToWishList = () => {
    wishListService.addToWishList(product, wishDispatch, wishState);
  };

  return (
    <div className={`${styles.modalBackdrop} ${showContent && styles.showBackdrop}`}>

      <Card className={`${styles.root} ${showContent && styles.showModal}`} ref={modalRef}>
        <CardHeader
          classes={{
            root: styles.header,
            title: styles.title,
            action: styles.action
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
          action={(
            <Button className="closeButton" onClick={onClick}>
              X
            </Button>
          )}
          title={product.name}
          titleTypographyProps={{ variant: 'h4' }}
        />

        <CardMedia
          className={styles.media}
          image={getImage(product.category, product.pets)}
          title={product.category}
        />
        <div className={styles.row}>
          <div className={styles.column}>
            <Typography className={styles.subtitle}>
              {currentProduct.demographic}
              {' '}
              {currentProduct.category}
              {' '}
              {currentProduct.type}
            </Typography>
            <Typography className={styles.typography}>
              {currentProduct.description}
            </Typography>
            <Typography className={styles.typography}>
              {' '}
              Price: $
              {currentProduct.price}
            </Typography>
          </div>
          <div className={styles.column}>
            <div style={{ marginLeft: 'auto' }}>
              <Typography className={styles.typography}>
                Available In:
              </Typography>
              <div className={styles.row}>
                {swatchesColorCodeAndName.map((swatch) => (
                  <div
                    key={swatch.colorName}
                    style={
            {
              color: 'var(--jet-black-color)',
              background: 'var(--ghost-white-color)',
              borderRadius: '3px',
              border: `1px solid ${swatch.colorCode}`,
              minWidth: '75px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '7px 10px',
              marginRight: '10px',
              marginTop: '5px',
              textTransform: 'capitalize'
            }
            }
                  >
                    {swatch.colorName}
                    <div style={{
                      background: `${swatch.colorCode}`, marginLeft: '10px', display: 'flex', width: '15px', height: '15px', borderRadius: '3px'
                    }}
                    />
                  </div>
                ))}
              </div>
              <CardActions className={styles.buttonActions} disableSpacing>
                {isCustomerLoggedIn && (
                <Button className="buttonUnstyled" aria-label="add to shopping cart" onClick={handleAddToWishList}>
                  <Favorite style={{ color: 'var(--flame-orange-color)', width: '30px', height: '30px' }} />
                </Button>
                )}
                <Button className="buttonUnstyled" aria-label="add to shopping cart" onClick={handleAddToCart}>
                  <AddShoppingCart style={{ color: 'var(--flame-orange-color)', width: '30px', height: '30px' }} />
                </Button>
              </CardActions>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Modal;
