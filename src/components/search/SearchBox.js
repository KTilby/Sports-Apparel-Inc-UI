import React, { useState, useEffect } from 'react';
import { InputBase } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Button from '../button/Button';
import { fetchProducts } from '../product-page/ProductPageService';
import styles from './Search.module.css';

const SearchBox = () => {
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [invalidMessage, setinValidMessage] = useState(false);
  const navigate = useHistory();
  const errorMsg = 'Please enter at least 3 characters';
  const noErrorMsg = '';

  useEffect(() => {
    // Fetch all products
    fetchProducts(setProducts, setApiError);
  }, []);

  const handleChange = (e) => {
    const lowerCaseTerm = e.target.value.toLowerCase();
    const lowerCaseTermTrim = lowerCaseTerm.trim();
    console.log(lowerCaseTerm);
    setSearchTerm(e.target.value);
    setinValidMessage(false);
    const searchMatches = [];
    products.forEach((product) => {
      if (lowerCaseTermTrim.length < 3) {
        setIsValid(false);
      }
      if (lowerCaseTermTrim.length >= 3) {
        setIsValid(true);
      }
      const fullProduct = `${product.demographic} ${product.category} ${product.type} ${product.description} ${product.name} ${product.demographic} ${product.type} ${product.description}`;
      if (fullProduct.toLowerCase().includes(lowerCaseTerm)) { searchMatches.push(product); }
    });
    setSearchResults(searchMatches);
  };

  const handleEnter = (e) => {
    if (!isValid && e.key === 'Enter') {
      setinValidMessage(true);
    } else if (e.key === 'Enter') {
      setinValidMessage(false);
      navigate.push({
        pathname: '/search-results',
        state: {
          searchResults,
          apiError,
          searchTerm
        }
      });
    }
  };

  const handleClick = () => {
    if (!isValid) {
      setinValidMessage(true);
    } else {
      setinValidMessage(false);
      navigate.push({
        pathname: '/search-results',
        state: {
          searchResults,
          apiError,
          searchTerm
        }
      });
    }
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <Button className="buttonUnstyled" aria-label="search" onClick={handleClick}>
          <SearchIcon />
        </Button>
        <InputBase
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleEnter}
          placeholder="Search..."
          classes={{
            root: styles.inputRoot,
            input: styles.inputInput
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      {
      (invalidMessage) ? (
        <p className={styles.error}>
          {errorMsg}
        </p>
      ) : (
        <p className={styles.noError}>{noErrorMsg}</p>
      )
}
    </div>
  );
};

export default SearchBox;
