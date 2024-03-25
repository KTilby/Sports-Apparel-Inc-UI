import React, { useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import ProductCard from '../product-card/ProductCard';
import styles from './Search.module.css';
import Modal from '../modal/Modal';

const SearchResults = () => {
  const location = useLocation();
  const { searchResults, apiError } = location.state;
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProd] = useState();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.searchResultPageContainer}>
      {(apiError) ? (
        <div className={styles.noResultContainer}>
          <h2 className={styles.title}>Error Fetching Products</h2>
        </div>
      ) : (
        <>
          {(searchResults.length === 0) ? (
            <div className={styles.noResultContainer}>
              <h2 className={styles.title}>No Matches Found</h2>
            </div>
          ) : (
            <>
              <h1 className={styles.title}>Search Results</h1>
              <div className={styles.productGrid}>
                {isOpen && <Modal onClick={closeModal} isOpen={isOpen} product={currentProduct} />}
                {searchResults.map((result) => (
                  <div key={result.id} className={styles.productCard}>
                    <ProductCard
                      product={result}
                      setOpen={openModal}
                      setCurrentProd={setCurrentProd}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
