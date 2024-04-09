import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Avatar, CardMedia, CardHeader, Typography
} from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { fetchProductById } from './ProductPageService';
import { useCart } from '../checkout-page/CartContext';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import getImage from '../../utils/productImageControl';
import Button from '../button/Button';
import cartService from '../checkout-page/CartService';
import {
  getDemographicColor, getFirstCharacter, parseColorCodeAndName
} from '../../utils/common';
import wishListService from '../wishlist-page/WishListService';
import { useWishList } from '../wishlist-page/WishListContext';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [apiError, setApiError] = useState(false);
  const { dispatch, state } = useCart();
  const [isLoading, setIsLoading] = useState(true);

  // use the useCallback to prevent re-render unnecessarily
  const getProductById = useCallback(() => {
    fetchProductById(productId, (data) => {
      setProduct(data);
      setIsLoading(false);
    }, setApiError);
  }, [productId]);
  const { wishDispatch, wishState } = useWishList();

  // Call getProductById when component mounts or productId changes
  useEffect(() => {
    getProductById();
  }, [productId, getProductById]);

  const handleAddToCart = () => {
    cartService.addToCart(product, dispatch, state);
  };

  const swatches = [product.primaryColorCodeWithName, product.secondaryColorCodeWithName];
  const swatchesColorCodeAndName = swatches.map(parseColorCodeAndName);

  const user = JSON.parse(sessionStorage.getItem('user'));
  const isCustomerLoggedIn = user && user.role === 'Customer';
  const handleAddToWishList = () => {
    wishListService.addToWishList(product, wishDispatch, wishState);
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {apiError && (
            <p className={styles.errMsg} data-testid="errMsg">
              {Constants.API_ERROR}
            </p>
          )}
          <div className={styles.content}>
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
              title={product.name}
              titleTypographyProps={{ variant: 'h4' }}
            />
            <div className={styles.row}>
              <CardMedia
                className={styles.media}
                image={getImage(product.category, product.pets)}
                title={product.category}
              />

              <div className={styles.column}>
                <Typography className={styles.subtitle}>
                  {product.demographic}
                  {' '}
                  {product.category}
                  {' '}
                  {product.type}
                </Typography>
                <Typography className={styles.typography}>
                  Available In:
                </Typography>
                <div className={styles.row}>
                  {swatchesColorCodeAndName.map((swatch) => (
                    <div
                      key={swatch.colorName}
                      style={{
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
                      }}
                    >
                      {swatch.colorName}
                      <div style={{
                        background: `${swatch.colorCode}`, marginLeft: '10px', display: 'flex', width: '15px', height: '15px', borderRadius: '3px'
                      }}
                      />
                    </div>
                  ))}
                </div>
                <Typography className={styles.typography}>
                  {product.description}
                </Typography>
                <Typography className={styles.typography}>
                  {product.longDescription}
                </Typography>
                <Typography className={styles.typography}>
                  {' '}
                  Price: $
                  {product.price}
                  {isCustomerLoggedIn
                  && (
                    <Button className="buttonUnstyled" aria-label="add to wish list" onClick={handleAddToWishList}>
                      <PlaylistAddIcon style={
                        {
                          color: 'var(--flame-orange-color)', width: '30px', height: '30px', paddingLeft: '15px'
                        }
                      }
                      />
                    </Button>
                  )}
                  <Button className="buttonUnstyled" aria-label="add to shopping cart" onClick={handleAddToCart}>
                    <AddShoppingCartIcon style={
                      {
                        color: 'var(--flame-orange-color)', width: '30px', height: '30px', paddingLeft: '15px'
                      }
                    }
                    />
                  </Button>
                </Typography>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
