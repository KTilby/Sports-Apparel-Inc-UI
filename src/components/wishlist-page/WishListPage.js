import React, { useState } from 'react';
import { useWishList } from './WishListContext';
import styles from './WishList.module.css';
import WishListCard from './WishListCard';
import Modal from '../modal/Modal';

/**
 * @name WishListPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const WishListPage = () => {
  const {
    wishState: { products }
  } = useWishList();
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProd] = useState();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>WishList</h1>
      {isOpen && <Modal onClick={closeModal} isOpen={isOpen} product={currentProduct} />}
      <div className={styles.grid}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <WishListCard
              key={product.id}
              product={product}
              setCurrentProd={setCurrentProd}
              setOpen={openModal}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishListPage;
