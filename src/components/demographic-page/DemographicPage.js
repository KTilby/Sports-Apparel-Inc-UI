import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProductCard from '../product-card/ProductCard';
import { fetchProducts, setDemographic } from '../product-page/ProductPageService';
import styles from './Demographic.module.css';
import Modal from '../modal/Modal';
import RickModal from '../rick-modal/RickModal';
import SideNav from '../sideNav/SideNav';
import Pagination from '../pagination/Pagination';
import { useLoader } from '../../contexts/LoaderContext';
import Loader from '../loader/Loader';
import DepartmentBanner from './DepartmentBanner';
import FilterMenu from '../filter-menu/FilterMenu';

const DemographicPage = ({ demographic }) => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isRick, setIsRick] = useState(false);
  const [currentProduct, setCurrentProd] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { loading, startLoading, stopLoading } = useLoader();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Default items per page
  const [priceFilter, setPriceFilter] = useState(' Featured');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openRickModal = () => {
    setIsRick(true);
  };

  const closeRickModal = () => {
    setIsRick(false);
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
    let filtered = products;
    if (selectedFilters.length > 0) {
      filtered = products.filter((product) => selectedFilters.includes(product.category)
        || selectedFilters.includes(product.type)
        || selectedFilters.includes(product.name));
    }

    // Apply price sorting
    let sorted = filtered;
    if (priceFilter === 'Price: High to low') {
      sorted = [...filtered].sort((a, b) => b.price - a.price);
    } else if (priceFilter === 'Price: Low to high') {
      sorted = [...filtered].sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(sorted);
  }, [selectedFilters, products, priceFilter]);

  const handlePriceFilterChange = (filter) => {
    setPriceFilter(filter);
  };

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
  console.log(currentItems);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader when={loading} />
      ) : (
        <>
          {apiError && <p>Error fetching products.</p>}
          {isOpen && <Modal onClick={closeModal} isOpen={isOpen} product={currentProduct} />}
          {isRick && <RickModal onClick={closeRickModal} isRick={isRick} dept={demographic} />}
          <div className={styles.row}>
            <SideNav submitHandler={applyFilters} />
            <div className={styles.column}>
              <div className={styles.rowMarginBottom}>
                <button
                  type="button"
                  className={styles.button}
                  onClick={openRickModal}
                >
                  Click for a special surprise!
                </button>
                <FilterMenu
                  onChange={handlePriceFilterChange}
                  priceFilter={priceFilter}
                />
              </div>
              <DepartmentBanner department={demographic} />
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
                totalItems={filteredProducts.length}
                currentPage={currentPage}
                paginate={paginate}
                itemsPerPage={itemsPerPage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DemographicPage;
