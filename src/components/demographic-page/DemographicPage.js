import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProductCard from '../product-card/ProductCard';
import { fetchProducts, setDemographic } from '../product-page/ProductPageService';
import styles from './Demographic.module.css';
import Modal from '../modal/Modal';
import SideNav from '../sideNav/SideNav';
import Pagination from '../pagination/Pagination';
import { useLoader } from '../../contexts/LoaderContext';
import Loader from '../loader/Loader';

const DemographicPage = ({ demographic }) => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProd] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { loading, startLoading, stopLoading } = useLoader();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Limit to a maximum of 20 items per page

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const applyFilters = (filters) => {
    setSelectedFilters(filters);
    setCurrentPage(1); // Reset current page when applying filters
  };

  useEffect(() => {
    startLoading();
    setDemographic(`${demographic}`);
    fetchProducts(setProducts, setApiError);
    stopLoading();
  }, [demographic, startLoading, stopLoading]);

  useEffect(() => {
    // Filter products based on selected filters
    if (selectedFilters.length === 0) {
      // If no filters selected, display all products
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => selectedFilters.includes(product.category)
      || selectedFilters.includes(product.type)
      || selectedFilters.includes(product.name));
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

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader when={loading} />
      ) : (
        <>
          <SideNav submitHandler={applyFilters} />
          <h1 className={styles.title}>{demographic}</h1>
          <h2 className={styles.search}>Search Results</h2>
          {apiError && <p>Error fetching products.</p>}
          {isOpen && <Modal onClick={closeModal} isOpen={isOpen} product={currentProduct} />}
          <div className={styles.grid}>
            {currentItems.map((product) => (
              <div className={styles.card} key={product.id}>
                <ProductCard
                  product={product}
                  setOpen={openModal}
                  setCurrentProd={setCurrentProd}
                />
              </div>
            ))}
          </div>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredProducts.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </>
      )}
    </div>
  );
};

export default DemographicPage;
