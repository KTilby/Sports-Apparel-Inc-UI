import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Pagination.module.css';

const Pagination = ({
  itemsPerPage, totalItems, currentPage, paginate
}) => {
  const pageNumbers = [];
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState('');

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (location.pathname !== prevLocation) {
      paginate(1);
      setPrevLocation(location.pathname);
    }
  }, [location.pathname, prevLocation, paginate]);

  return (
    <nav>
      <ul className={styles.pagination}>
        {currentPage !== 1 && (
        <li className={styles.pageItem}>
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`${styles.arrowButton} ${styles.leftArrow}`}
            type="button"
          >
            ←
          </button>
          <span className={styles.leftSeparator}>|</span>
        </li>
        )}
        {pageNumbers.map((number, index) => (
          <li key={number} className={styles.pageItem}>
            <button
              onClick={() => paginate(number)}
              className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
              type="button"
            >
              {number}
            </button>
            {index === pageNumbers.length - 1 && currentPage !== pageNumbers.length && (
              <>
                <span className={styles.separator}>|</span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  className={`${styles.arrowButton} ${styles.arrow}`}
                  type="button"
                >
                  →
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
