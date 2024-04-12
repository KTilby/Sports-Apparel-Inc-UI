import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import Button from '../button/Button';
import styles from './FilterMenu.module.css';

const FilterMenu = ({
  priceFilter, onChange
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <Button className={open ? 'menuOpen' : 'loginButton'} onClick={open ? handleClose : handleOpen}>
        Sort by:
        {' '}
        {priceFilter}
        {open ? <KeyboardArrowUp style={{ marginLeft: '2px' }} /> : <KeyboardArrowDown style={{ marginLeft: '2px' }} />}
      </Button>
      {open
      && (
      // You can add onClose after the onChange in the button if you'd like for the dropdown
      // to disappear after click
      <div className={styles.dropdown}>
        <Button className="menuItemBorder" onClick={() => { onChange('Price: Low to high'); handleClose(); }}> Price: Low to high</Button>
        <Button className="menuItemBorder" onClick={() => { onChange('Price: High to low'); handleClose(); }}> Price: High to low</Button>
        <Button className="menuItemBorder" onClick={() => { onChange('Featured'); handleClose(); }}> Featured</Button>
      </div>
      )}

    </div>
  );
};

export default FilterMenu;
