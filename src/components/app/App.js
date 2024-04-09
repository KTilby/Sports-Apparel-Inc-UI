import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';
import styles from './App.module.css';
import HomePage from '../home-page/HomePage';
import CheckoutPage from '../checkout-page/NewCheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import SearchResults from '../search/SearchResultsPage';
import DemographicPage from '../demographic-page/DemographicPage';
import ProductDetailPage from '../product-page/ProductDetailPage';
import Login from '../login/Login';
import WishListPage from '../wishlist-page/WishListPage';

/**
 * @name App
 * @returns component
 */
const App = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <StylesProvider injectFirst>
      <BrowserRouter>
        <div className={styles.App}>
          <Header handleOpen={handleOpen} user={user} setUser={setUser} />
          {open && <Login handleClose={handleClose} user={user} setUser={setUser} />}
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/checkout" render={() => <CheckoutPage />} />
            <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
            <Route exact path="/men" render={() => <DemographicPage demographic="Men" />} />
            <Route exact path="/women" render={() => <DemographicPage demographic="Women" />} />
            <Route exact path="/kids" render={() => <DemographicPage demographic="Kids" />} />
            <Route exact path="/pets" render={() => <DemographicPage demographic="Pets" />} />
            <Route exact path="/search-results" render={() => <SearchResults />} />
            <Route path="/products/:productId" render={() => <ProductDetailPage />} />
            <Route exact path="/wishlist" render={() => <WishListPage />} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </StylesProvider>
  );
};

export default App;
