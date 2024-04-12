import React from 'react';
import { Typography } from '@material-ui/core';
import styles from './DepartmentBanner.module.css';
import Mens2 from '../../assets/images/product-images/Mens2.jpg';
import Women from '../../assets/images/product-images/Women.jpg';
import Pets from '../../assets/images/product-images/Pets.jpg';
import Kids2 from '../../assets/images/product-images/Kids2.jpg';
import USCWomen from '../../assets/images/product-images/USCWomen.jpg';

const DepartmentBanner = ({ department }) => {
  const renderImage = (demo) => {
    switch (demo) {
      case 'Men':
        return <img className={styles.Men} alt="Men Playing Soccer" src={Mens2} />;
      case 'Women':
        return <img className={styles.Women} alt="Women Playing Soccer" src={Women} />;
      case 'Kids':
        return <img className={styles.Kids} alt="Kids Playing Soccer" src={Kids2} />;
      case 'Pets':
        return <img className={styles.Pets} alt="Dog Running With Ball" src={Pets} />;
      case 'Search Results':
        return <img className={styles.USCWomen} alt="Dog Running With Ball" src={USCWomen} />;
      default:
        return null;
    }
  };
  //   <div className={styles.container}>
  return (
    <div className={styles.imageContainer}>
      <Typography className={styles.typography}>
        {department}
      </Typography>
      {renderImage(department)}
    </div>
  //   </div>
  );
};

export default DepartmentBanner;
