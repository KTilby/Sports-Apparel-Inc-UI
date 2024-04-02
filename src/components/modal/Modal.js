import React, { useEffect, useRef } from 'react';
import {
  Card, Typography, CardMedia, CardHeader, Avatar
} from '@material-ui/core';
import styles from './Modal.module.css';
import Button from '../button/Button';
import getImage from '../../utils/productImageControl';
import { getDemographicColor, getFirstCharacter } from '../../utils/common';

const Modal = ({ onClick, isOpen, product }) => {
  const currentProduct = product;
  const modalRef = useRef();
  const swatches = [product.primaryColorCode, product.secondaryColorCode];

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

  return (
    <div className={styles.modalBackdrop}>
      <Card className={styles.root} ref={modalRef}>
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
            <Button className="buttonUnstyled" onClick={onClick}>
              <Typography style={{ fontSize: '1.75em' }}>X</Typography>
            </Button>
          )}
          title={product.name}
          titleTypographyProps={{ variant: 'h4' }}
        />

        <CardMedia
          className={styles.media}
          image={getImage(product.category)}
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
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Modal;
