import { Fade } from 'react-slideshow-image';
import { Typography } from '@material-ui/core';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import React from 'react';
import Running from '../../assets/images/product-images/Running.jpg';
import Hockey from '../../assets/images/product-images/Hockey.jpg';
import Baseball from '../../assets/images/product-images/Baseball.jpg';
import styles from './slideshow.module.css';
import 'react-slideshow-image/dist/styles.css';

/**
 * @name Slideshow
 * @description Slideshow displaying ads in 3 second intervals
 * @return component
 */
const Slideshow = () => {
  const properties = {
    prevArrow:
  <button type="button" className={styles.arrowButton}>
    <ArrowBack style={{
      color: 'var(--ghost-white-color)', width: '40px', height: '40px', display: 'flex'
    }}
    />
  </button>,
    nextArrow:
  <button type="button" className={styles.arrowButton}>
    <ArrowForward style={{
      color: 'var(--ghost-white-color)', width: '40px', height: '40px', display: 'flex'
    }}
    />
  </button>
  };

  return (
    <div className={styles.container}>
      <Fade duration={5000} prevArrow={properties.prevArrow} nextArrow={properties.nextArrow}>
        <div className={styles.imageContainer}>
          <Typography className={styles.typography}>
            Running Shoes
            <br />
            15% Off
          </Typography>
          <img className={styles.running} alt="Running" src={Running} />
        </div>
        <div className={styles.imageContainer}>
          <Typography className={styles.typography}>
            Hockey Gear
            <br />
            20% Off
          </Typography>
          <img className={styles.image} alt="Hockey" src={Hockey} />
        </div>
        <div className={styles.imageContainer}>
          <Typography className={styles.typography}>
            Baseball Gear
            <br />
            20% Off
          </Typography>
          <img className={styles.image} alt="Baseball" src={Baseball} />
        </div>
      </Fade>
    </div>
  );
};

export default Slideshow;
