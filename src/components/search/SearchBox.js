import React, { useState } from 'react';
import { InputBase } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Button from '../button/Button';
import styles from './Search.module.css';
import { INVALID_SEARCH } from '../../utils/constants';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');
  const navigate = useHistory();

  const isValidSearchTerm = (term) => (term.trim().length >= 3);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (isValidSearchTerm(searchTerm)) {
      navigate.push({
        pathname: '/search-results',
        state: {
          searchTerm
        }
      });
      setSearchTerm('');
      setInvalidMessage('');
    } else {
      setInvalidMessage(INVALID_SEARCH);
    }
  };

  const handleClick = () => {
    handleSearch();
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <Button className="buttonUnstyled" aria-label="search" onClick={handleClick}>
          <SearchIcon style={{ color: 'var(--yale-blue-color)' }} />
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
      {invalidMessage && <p className={styles.error}>{invalidMessage}</p>}
    </div>
  );
};

export default SearchBox;
