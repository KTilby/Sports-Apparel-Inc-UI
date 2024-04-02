import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import Slideshow from '../slideshow/Slideshow';
import ProductCard from '../product-card/ProductCard';
import Constants from '../../utils/constants';
import { fetchProducts } from '../product-page/ProductPageService';
import DisplayedProducts from '../displayed-products/DisplayedProducts';
import Modal from '../modal/Modal';
import PopularProductCard from '../popular-product-card/PopularProductCard';

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

  return (
    <div className={styles.container}>
      {apiError && (
        <p className={styles.errMsg} data-testid="errMsg">
          {Constants.API_ERROR}
        </p>
      )}
      {isOpen && <Modal onClick={closeModal} isOpen={isOpen} product={currentProduct} />}
      <Slideshow />
      <DisplayedProducts apiError={apiError} header="New Products">
        {products
          .slice(products.length - 6, products.length - 1)
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
        {products
          .slice(products.length - 5, products.length - 1)
          .map((product) => (
            <PopularProductCard
              key={product.id}
              product={product}
              setOpen={openModal}
              setCurrentProd={setCurrentProd}
            />
          ))}
      </DisplayedProducts>
    </div>
  );
};

export default HomePage;
