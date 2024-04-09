import React, { useState, useContext } from 'react';
import styles from './HomePage.module.css';
import Slideshow from '../slideshow/Slideshow';
import ProductCard from '../product-card/ProductCard';
import Constants from '../../utils/constants';
import DisplayedProducts from '../displayed-products/DisplayedProducts';
import Modal from '../modal/Modal';
import PopularProductCard from '../popular-product-card/PopularProductCard';
import { ProductContext } from '../../contexts/ProductContext';
import Loader from '../loader/Loader';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProd] = useState();
  const {
    loading, apiError, newestProducts, popularProducts
  } = useContext(ProductContext);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader when={loading} />
      ) : (
        <>
          {apiError && (
            <p className={styles.errMsg} data-testid="errMsg">
              {Constants.API_ERROR}
            </p>
          )}
          {isOpen && <Modal onClick={closeModal} isOpen={isOpen} product={currentProduct} />}
          <Slideshow />
          <DisplayedProducts apiError={apiError} header="New Products">
            {newestProducts
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  setOpen={openModal}
                  setCurrentProd={setCurrentProd}
                />
              ))}
          </DisplayedProducts>
          <DisplayedProducts apiError={apiError} header="Popular Products">
            {popularProducts
              .map((product) => (
                <PopularProductCard
                  key={product.id}
                  product={product}
                  setOpen={openModal}
                  setCurrentProd={setCurrentProd}
                />
              ))}
          </DisplayedProducts>
        </>
      )}
    </div>
  );
};

export default HomePage;
