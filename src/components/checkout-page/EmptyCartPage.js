import React, { useContext, useState } from 'react';
import styles from './ShoppingCartPage.module.css';
import EmptyCart from '../../assets/images/emptybag.svg';
import DisplayedProducts from '../displayed-products/DisplayedProducts';
import PopularProductCard from '../popular-product-card/PopularProductCard';
import { ProductContext } from '../../contexts/ProductContext';
import Modal from '../modal/Modal';

const EmptyCartPage = () => {
  const { popularProducts } = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProd] = useState();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.emptyCartContainer}>
      <div className={styles.emptyCartMessage}>
        <img src={EmptyCart} alt="empty cart" width={250} height={250} />
        <h2>Nothing to see here. </h2>
        <h2>Add products to your cart to get started.</h2>
      </div>
      <div>
        <hr className={styles.dividingLine} />
        {isOpen && (
          <Modal
            onClick={closeModal}
            isOpen={isOpen}
            product={currentProduct}
          />
        )}
        <DisplayedProducts header="Popular Products" noBackground>
          {popularProducts
            .map((product) => (
              <PopularProductCard
                key={product.id}
                currentProduct={currentProduct}
                product={product}
                setOpen={openModal}
                setCurrentProd={setCurrentProd}
              />
            ))}
        </DisplayedProducts>
      </div>
    </div>
  );
};

export default EmptyCartPage;
