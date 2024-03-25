import React, { useState, useEffect } from 'react';
import { InputBase } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Button from '../button/Button';
import fetchProducts from '../product-page/ProductPageService';
import styles from './Search.module.css';

const SearchBox = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all products
    fetchProducts(setProducts, setApiError);
  }, []);

  const handleChange = (e) => {
    const lowerCaseTerm = e.target.value.toLowerCase();
    setSearchTerm(e.target.value);
    const searchMatches = [];
    products.forEach((product) => {
      if (lowerCaseTerm === product.name?.toLowerCase()
       || lowerCaseTerm === product.demographic?.toLowerCase()
       || lowerCaseTerm === product.description?.toLowerCase()
       || lowerCaseTerm === product.category?.toLowerCase()
       || lowerCaseTerm === product.type?.toLowerCase()) { searchMatches.push(product); }
    });
    setSearchResults(searchMatches);
  };

  return (
    <div className={styles.searchContainer}>
      <Link
        to={{
          pathname: '/search-results',
          state: {
            searchResults,
            apiError
          }
        }}
        aria-label="search"
        className={styles.searchIconBtn}
      >
        <Button className="buttonUnstyled" aria-label="search">
          <SearchIcon />
        </Button>
      </Link>
      <InputBase
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search..."
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
};

export default SearchBox;
