import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ProductCard from '../product-card/ProductCard';
import DisplayedProducts from '../displayed-products/DisplayedProducts';
import PopularProductCard from '../popular-product-card/PopularProductCard';
import styles from './Search.module.css';
import Modal from '../modal/Modal';
import SideNav from '../sideNav/SideNav';
import { useLoader } from '../../contexts/LoaderContext';
import Loader from '../loader/Loader';
import { ProductContext } from '../../contexts/ProductContext';
import Pagination from '../pagination/Pagination';

const SearchResultsPage = () => {
  const location = useLocation();
  const history = useHistory();
  const { products, apiError, popularProducts } = useContext(ProductContext);
  const { searchTerm } = location.state;
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProd] = useState();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { loading } = useLoader();
  const noResultsMessage = `Oh No! We couldn't find a match for "${searchTerm}"`;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const search = () => {
      const searchMatches = [];
      products.forEach((product) => {
        const fullProduct = `${product.demographic} ${product.category} ${product.type} ${product.description} ${product.name} ${product.demographic} ${product.type} ${product.description}`;
        if (fullProduct.toLowerCase().includes(lowerCaseTerm)) {
          searchMatches.push(product);
        }
      });
      setSearchResults(searchMatches);
    };

    search();
  }, [products, searchTerm]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const applyFilters = (filters) => {
    setSelectedFilters(filters);
    setCurrentPage(1);
  };

  useEffect(() => {
    // Filter products based on selected filters
    if (selectedFilters.length === 0) {
      // If no filters selected, display searched products
      setFilteredProducts(searchResults);
    } else {
      const filtered = searchResults.filter((product) => selectedFilters.includes(product.category)
      || selectedFilters.includes(product.type)
      || selectedFilters.includes(product.name));
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

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={styles.searchResultPageContainer}>
      {loading ? (
        <Loader when={loading} />
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
                </div>
              ) : (
                <>
                  <SideNav submitHandler={applyFilters} />
                  <h1 className={styles.title}>Search Results</h1>
                  <div className={styles.productGrid}>
                    {isOpen && (
                    <Modal
                      onClick={closeModal}
                      isOpen={isOpen}
                      product={currentProduct}
                    />
                    )}
                    {currentItems.map((result) => (
                      <div key={result.id} className={styles.productCard}>
                        <ProductCard
                          product={result}
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResultsPage;
