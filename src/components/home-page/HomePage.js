import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import Slideshow from '../slideshow/Slideshow';
import ProductCard from '../product-card/ProductCard';
import Constants from '../../utils/constants';
import fetchProducts from '../product-page/ProductPageService';
import DisplayedProducts from '../displayed-products/DisplayedProducts';
import Modal from '../modal/Modal';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProd] = useState();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // for now, just takes from the total product list provided by fetchProducts and slices it
  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  // uses Product Card for product list for now, can be updated to display different cards
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
        )}
        {isOpen && <Modal onClick={closeModal} isOpen={isOpen} product={currentProduct} />}
        <Slideshow />
        <div className={styles.flexContainer}>
          <DisplayedProducts apiError={apiError} header="New Products">
            {products.slice(products.length - 6, products.length - 1).map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  setOpen={openModal}
                  setCurrentProd={setCurrentProd}
                />
              </div>
            ))}
          </DisplayedProducts>
        </div>
        <div className={styles.flexContainer}>
          <DisplayedProducts apiError={apiError} header="Popular Products">
            {products.slice(products.length - 5, products.length - 1).map((product) => (
              <div key={product.id}>
                <ProductCard
                  product={product}
                  setOpen={openModal}
                  setCurrentProd={setCurrentProd}
                />
              </div>
            ))}
          </DisplayedProducts>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
