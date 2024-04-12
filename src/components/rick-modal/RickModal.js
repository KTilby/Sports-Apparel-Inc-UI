import React, { useRef, useEffect } from 'react';
import styles from './RickModal.module.css';

const RickModal = ({ isRick, onClick, dept }) => {
  // if (!isRick) return null;

  const modalRef = useRef();

  const vidSource = (department) => {
    switch (department) {
      case 'Men':
        return 'https://www.youtube.com/embed/btPJPFnesV4?autoplay=1';
      case 'Women':
        return 'https://www.youtube.com/embed/PIb6AZdTr-A?autoplay=1';
      case 'Kids':
        return 'https://www.youtube.com/embed/wAXXI5YobrM?autoplay=1';
      case 'Pets':
        return 'https://www.youtube.com/embed/2yJgwwDcgV8?autoplay=1';
      case 'Search':
        return 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
      default:
        return null;
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (isRick && !modalRef.current.contains(e.target)) {
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
      <div className={styles.root} ref={modalRef}>
        <iframe
          width={1200}
          height={700}
          controls
          src={vidSource(dept)}
          title="Surprise!"
        />
      </div>
    </div>

  );
};

export default RickModal;
