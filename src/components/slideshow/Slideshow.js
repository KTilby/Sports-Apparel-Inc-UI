import { Fade } from 'react-slideshow-image';
import React from 'react';
import nikeAd from '../../assets/images/nike-ad.png';
import adidasAd from '../../assets/images/adidas-ad.png';
import hokaAd from '../../assets/images/hoka-ad.png';
import styles from './slideshow.module.css';
import 'react-slideshow-image/dist/styles.css';

/**
 * @name Slideshow
 * @description Slideshow displaying ads in 3 second intervals
 * @return component
 */
const Slideshow = () => (
  <div className={styles.container}>
    <Fade duration={3000}>
      <img className={styles.image} alt="Nike Ad" src={nikeAd} />
      <img className={styles.image} alt="Adidas Ad" src={adidasAd} />
      <img className={styles.image} alt="Hoka Ad" src={hokaAd} />
    </Fade>
  </div>
);

export default Slideshow;
