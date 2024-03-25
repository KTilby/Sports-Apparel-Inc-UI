import React, { useEffect, useRef } from 'react';
import styles from './Modal.module.css';
import constants from '../../utils/constants';
import Button from '../button/Button';

const Modal = ({ onClick, isOpen, product }) => {
  const currentProduct = product;
  const modalRef = useRef();
  const primaryRef = useRef();
  const secondaryRef = useRef();
  const primColor = product.primaryColorCode;
  const secondaryColor = product.secondaryColorCode;
  useEffect(() => {
    const handler = (e) => {
      if (isOpen && !modalRef.current.contains(e.target)) {
        onClick();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  });

  return (
    <div className={styles.modalBackdrop}>
      <div ref={modalRef} className={styles.modal}>
        <div className={styles.container}>
          <h1 className={styles.name}>{currentProduct.name}</h1>
          <Button className="button" onClick={onClick}>X</Button>
          <img src={constants.PLACEHOLDER_IMAGE} alt="" className={styles.image} />
          <div
            ref={primaryRef}
            style={
            {
              backgroundColor: primColor,
              width: '60px',
              height: '35px',
              borderRadius: '10%',
              gridRow: '3',
              gridColumn: '2',
              border: '2px solid #1F3770'
            }
            }
          />
          <div
            ref={secondaryRef}
            style={
            {
              backgroundColor: secondaryColor,
              width: '60px',
              height: '35px',
              borderRadius: '10%',
              gridRow: '3',
              gridColumn: '3',
              border: '2px solid #1F3770'
            }
            }
          />
          <h2 className={styles.demographic}>{currentProduct.demographic}</h2>
          <h2 className={styles.category}>{currentProduct.category}</h2>
          <h2 className={styles.type}>{currentProduct.type}</h2>
          <h2 className={styles.price}>
            Price: $
            {currentProduct.price}
          </h2>
          <p className={styles.description}>{currentProduct.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
