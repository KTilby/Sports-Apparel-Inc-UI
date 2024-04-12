import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Pagination.module.css';

const Pagination = ({
  totalItems, currentPage, paginate, itemsPerPage, onItemsPerPageChange
}) => {
  const pageNumbers = [];
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState('');
  const [startIndex, setStartIndex] = useState(0);

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const pageTotal = pageNumbers.length;

  useEffect(() => {
    if (location.pathname !== prevLocation) {
      paginate(1);
      setPrevLocation(location.pathname);
    }
  }, [location.pathname, prevLocation, paginate]);

  useEffect(() => {
    if (currentPage > startIndex + 4) {
      setStartIndex(currentPage - 4);
    } else if (currentPage <= startIndex) {
      setStartIndex(currentPage - 1);
    }
  }, [currentPage, startIndex]);

  const renderPageNumbers = () => {
    const totalPages = pageNumbers.length;

    // Determine the starting index of the visible page numbers
    let startingIndex = 0;
    if (totalPages > 5) {
      startingIndex = Math.min(Math.max(currentPage - 5, 0), totalPages - 5);
    }

    // Get the 5 visible page numbers
    const visiblePageNumbers = pageNumbers.slice(startingIndex, startingIndex + 5);

    return visiblePageNumbers.map((number) => (
      <li key={number} className={styles.pageItem}>
        <button
          onClick={() => paginate(number)}
          className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
          type="button"
        >
          {number}
        </button>
      </li>
    ));
  };

  return (
    <nav>
      <div className={styles.paginationContainer}>
        <div className={styles.pageInfo}>
          <span>{`Page ${currentPage} of ${pageTotal}`}</span>
        </div>
      </div>
      <ul className={styles.pagination}>
        <li className={styles.pageItem}>
          <button
            onClick={() => paginate(1)}
            className={`${styles.arrowButton} ${styles.leftArrow} ${currentPage === 1 ? styles.disabled : ''}`}
            type="button"
            disabled={currentPage === 1}
          >
            {'<<'}
          </button>
        </li>
        <li className={styles.pageItem}>
          <button
            onClick={() => {
              if (currentPage > 1) paginate(currentPage - 1);
            }}
            className={`${styles.arrowButton} ${styles.leftArrow} ${currentPage === 1 ? styles.disabled : ''}`}
            type="button"
            disabled={currentPage === 1}
          >
            {'<'}
          </button>
          <span className={styles.leftSeparator}>|</span>
        </li>
        {renderPageNumbers()}
        <li className={styles.pageItem}>
          <span className={styles.separator}>|</span>
          <button
            onClick={() => {
              if (currentPage < Math.ceil(totalItems / itemsPerPage)) paginate(currentPage + 1);
            }}
            className={`${styles.arrowButton} ${styles.arrow} ${
              currentPage === pageNumbers.length ? styles.disabled : ''}`}
            type="button"
            disabled={currentPage === pageNumbers.length}
          >
            {'>'}
          </button>
        </li>
        <li className={styles.pageItem}>
          <button
            onClick={() => paginate(pageNumbers.length)}
            className={`${styles.arrowButton} ${styles.arrow} ${
              currentPage === pageNumbers.length ? styles.disabled : ''}`}
            type="button"
            disabled={currentPage === pageNumbers.length}
          >
            {'>>'}
          </button>
        </li>
      </ul>
      <div className={styles.itemsPerPageContainer}>
        <label htmlFor="itemsPerPage">
          Maximum Items Per Page:
          {' '}
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(parseInt(e.target.value, 10))}
            onBlur={(e) => onItemsPerPageChange(parseInt(e.target.value, 10))}
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>
    </nav>
  );
};

export default Pagination;
