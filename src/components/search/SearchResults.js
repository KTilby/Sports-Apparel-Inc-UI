import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';
import DisplayedProducts from '../displayed-products/DisplayedProducts';
import PopularProductCard from '../popular-product-card/PopularProductCard';
import styles from './Search.module.css';
import Modal from '../modal/Modal';
import SideNav from '../sideNav/SideNav';
import { fetchProducts } from '../product-page/ProductPageService';
import { SideNavProvider } from '../sideNav/SideNavContext';

const SearchResults = () => {
  const location = useLocation();
  const history = useHistory();
  const { searchResults, apiError, searchTerm } = location.state;
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProd] = useState();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchProducts(setProducts)
      .finally(() => setIsLoading(false)); // Set loading to false after fetching
  }, []);

  const noResultsMessage = `Oh No! We couldn't find a match for "${searchTerm}"`;

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const applyFilters = (filters) => {
    setSelectedFilters(filters);
  };

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  useEffect(() => {
    // Filter products based on selected filters
    if (selectedFilters.length === 0) {
      // If no filters selected, display all products
      setFilteredProducts(searchResults);
    } else {
      const filtered = searchResults.filter((product) => selectedFilters.includes(product.category)
      || selectedFilters.includes(product.type));
      setFilteredProducts(filtered);
    }
  }, [selectedFilters, searchResults]);

  useEffect(() => {
    const filters = history.listen(() => {
      setSelectedFilters([]);
    });
    return () => {
      filters();
    };
  }, [history]);

  return (
    <div className={styles.searchResultPageContainer}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {apiError ? (
            <div className={styles.noResultContainer}>
              <h2 className={styles.title}>Error Fetching Products</h2>
            </div>
          ) : (
            <>
              {(filteredProducts.length === 0) ? (
                <div className={styles.noResultContainer}>
                  <h2 className={styles.titleNoResults}>{noResultsMessage}</h2>
                  <hr className={styles.dividingLine} />
                  <DisplayedProducts apiError={apiError} header="Popular Products" noBackground>
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
              ) : (
                <>
                  <SideNavProvider>
                    <SideNav submitHandler={applyFilters} />
                  </SideNavProvider>
                  <h1 className={styles.title}>Search Results</h1>
                  <div className={styles.productGrid}>
                    {isOpen && (
                    <Modal
                      onClick={closeModal}
                      isOpen={isOpen}
                      product={currentProduct}
                    />
                    )}
                    {filteredProducts.map((result) => (
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
        </>
      )}
    </div>
  );
};

export default SearchResults;
