import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import { fetchProducts } from './ProductPageService';
import Modal from '../modal/Modal';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
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

  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      {isOpen && <Modal onClick={closeModal} isOpen={isOpen} product={currentProduct} />}
      <div className={styles.container}>
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} setOpen={openModal} setCurrentProd={setCurrentProd} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
