import React, { useState, useEffect } from 'react';
import ProductCard from '../product-card/ProductCard';
import fetchProducts, {
  setDemographic
} from '../product-page/ProductPageService';
import styles from './Demographic.module.css';
import Modal from '../modal/Modal';

/**
 * Demographic Page Component
 * @returns {JSX.Element} Demographic Page JSX
 */
const DemographicPage = ({ demographic }) => {
  /**
   * State to store the products
   * @type {Array}
   */
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
    // Fetch products for the DemographicPage
    setDemographic(`${demographic}`);
    fetchProducts(setProducts, setApiError);
  }, [demographic]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{demographic}</h1>
      <h2 className={styles.search}>Search Results</h2>
      {apiError && <p>Error fetching products.</p>}
      {isOpen && <Modal onClick={closeModal} isOpen={isOpen} product={currentProduct} />}
      <div className={styles.grid}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <ProductCard product={product} setOpen={openModal} setCurrentProd={setCurrentProd} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemographicPage;
