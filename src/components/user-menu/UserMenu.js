import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import Button from '../button/Button';
import styles from './UserMenu.module.css';

const UserMenu = ({ handleLogout, user }) => {
  const [open, setOpen] = useState(false);
  const navigate = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNav = () => {
    setOpen(false);
    navigate.push({ pathname: '/wishlist' });
  };

  return (
    <div className={styles.container}>
      <Button className={open ? 'menuOpen' : 'loginButton'} onClick={open ? handleClose : handleOpen}>
        Hi,
        {' '}
        {user.firstName}
        {open ? <KeyboardArrowUp style={{ marginLeft: '2px' }} /> : <KeyboardArrowDown style={{ marginLeft: '2px' }} />}
      </Button>
      {open
      && (
      <div className={styles.dropdown}>
        <Button className="menuItemBorder" onClick={handleNav}>Wishlist</Button>
        <Button className="menuItem" onClick={handleLogout}>Logout</Button>
      </div>
      )}

    </div>
  );
};

export default UserMenu;
