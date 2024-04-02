import React, { useState, useEffect } from 'react';
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
  getDemographicColor, getFirstCharacter
} from '../../utils/common';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [apiError, setApiError] = useState(false);
  const swatches = [product.primaryColorCode, product.secondaryColorCode];
  const { dispatch, state } = useCart();

  useEffect(() => {
    fetchProductById(productId, setProduct, setApiError);
  }, [productId]);

  const handleAddToCart = () => {
    cartService.addToCart(product, dispatch, state);
  };

  return (
    <div className={styles.container}>
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
            image={getImage(product.category)}
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
              {swatches.map((swatch) => (
                <div
                  style={
        {
          color: 'var(--jet-black-color)',
          background: 'var(--ghost-white-color)',
          borderRadius: '3px',
          border: `1px solid ${swatch}`,
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
                  {swatch}
                  <div style={{
                    background: `${swatch}`, marginLeft: '10px', display: 'flex', width: '15px', height: '15px', borderRadius: '3px'
                  }}
                  />
                </div>
              ))}
            </div>
            <Typography className={styles.typography}>
              {product.description}
            </Typography>
            <Typography className={styles.typography}>
              The kids weightlifting pool noodle is a fun and safe way for children
              to engage in weightlifting exercises.
              Made of soft and lightweight foam material, this pool noodle is designed
              to mimic the feel of a real weightlifting barbell,
              allowing kids to practice proper lifting techniques without the risk of injury.
              It is a great tool for building strength, coordination,
              and motor skills in a playful and engaging manner. With bright colors and playful
              designs, this kids weightlifting pool noodle makes
              exercise enjoyable and accessible for young fitness enthusiasts.
            </Typography>
            <Typography className={styles.typography}>
              {' '}
              Price: $
              {product.price}
              <Button className="buttonUnstyled" aria-label="add to wish list">
                <PlaylistAddIcon style={
                  {
                    color: 'var(--flame-orange-color)', width: '30px', height: '30px', paddingLeft: '15px'
                  }
                }
                />
              </Button>
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
    </div>
  );
};

export default ProductDetailPage;
