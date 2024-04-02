import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProductCard from '../product-card/ProductCard';
import { fetchProducts, setDemographic } from '../product-page/ProductPageService';
import styles from './Demographic.module.css';
import Modal from '../modal/Modal';
import SideNav from '../sideNav/SideNav';
import { SideNavProvider } from '../sideNav/SideNavContext';

const DemographicPage = ({ demographic }) => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProd] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);

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
    setDemographic(`${demographic}`);
    fetchProducts(setProducts, setApiError);
  }, [demographic]);

  useEffect(() => {
    // Filter products based on selected filters
    if (selectedFilters.length === 0) {
      // If no filters selected, display all products
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => selectedFilters.includes(product.category)
      || selectedFilters.includes(product.type));
      setFilteredProducts(filtered);
    }
  }, [selectedFilters, products]);

  useEffect(() => {
    const filters = history.listen(() => {
      setSelectedFilters([]);
    });
    return () => {
      filters();
    };
  }, [history]);

  return (
    <div className={styles.container}>
      <SideNavProvider>
        <SideNav submitHandler={applyFilters} demographic={demographic} />
      </SideNavProvider>
      <h1 className={styles.title}>{demographic}</h1>
      <h2 className={styles.search}>Search Results</h2>
      {apiError && <p>Error fetching products.</p>}
      {isOpen && <Modal onClick={closeModal} isOpen={isOpen} product={currentProduct} />}
      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <div className={styles.card} key={product.id}>
            <ProductCard product={product} setOpen={openModal} setCurrentProd={setCurrentProd} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemographicPage;
